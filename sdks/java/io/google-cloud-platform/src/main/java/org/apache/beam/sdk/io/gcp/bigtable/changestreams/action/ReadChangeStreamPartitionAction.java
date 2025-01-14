/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.apache.beam.sdk.io.gcp.bigtable.changestreams.action;

import static org.apache.beam.sdk.io.gcp.bigtable.changestreams.ByteStringRangeHelper.formatByteStringRange;
import static org.apache.beam.sdk.io.gcp.bigtable.changestreams.ByteStringRangeHelper.isSuperset;
import static org.apache.beam.sdk.io.gcp.bigtable.changestreams.ByteStringRangeHelper.partitionsToString;

import com.google.api.gax.rpc.ServerStream;
import com.google.cloud.bigtable.common.Status;
import com.google.cloud.bigtable.data.v2.models.ChangeStreamContinuationToken;
import com.google.cloud.bigtable.data.v2.models.ChangeStreamMutation;
import com.google.cloud.bigtable.data.v2.models.ChangeStreamRecord;
import com.google.cloud.bigtable.data.v2.models.CloseStream;
import com.google.cloud.bigtable.data.v2.models.Range;
import com.google.protobuf.ByteString;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.apache.beam.sdk.annotations.Internal;
import org.apache.beam.sdk.io.gcp.bigtable.changestreams.ChangeStreamMetrics;
import org.apache.beam.sdk.io.gcp.bigtable.changestreams.dao.ChangeStreamDao;
import org.apache.beam.sdk.io.gcp.bigtable.changestreams.dao.MetadataTableDao;
import org.apache.beam.sdk.io.gcp.bigtable.changestreams.dofn.DetectNewPartitionsDoFn;
import org.apache.beam.sdk.io.gcp.bigtable.changestreams.model.PartitionRecord;
import org.apache.beam.sdk.io.gcp.bigtable.changestreams.restriction.StreamProgress;
import org.apache.beam.sdk.transforms.DoFn;
import org.apache.beam.sdk.transforms.DoFn.ProcessContinuation;
import org.apache.beam.sdk.transforms.splittabledofn.ManualWatermarkEstimator;
import org.apache.beam.sdk.transforms.splittabledofn.RestrictionTracker;
import org.apache.beam.sdk.values.KV;
import org.joda.time.Duration;
import org.joda.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * This class is part of {@link
 * org.apache.beam.sdk.io.gcp.bigtable.changestreams.dofn.ReadChangeStreamPartitionDoFn} SDF.
 */
@SuppressWarnings({"UnusedVariable", "UnusedMethod"})
@Internal
public class ReadChangeStreamPartitionAction {
  private static final Logger LOG = LoggerFactory.getLogger(ReadChangeStreamPartitionAction.class);

  private final MetadataTableDao metadataTableDao;
  private final ChangeStreamDao changeStreamDao;
  private final ChangeStreamMetrics metrics;
  private final ChangeStreamAction changeStreamAction;
  private final Duration heartbeatDuration;

  public ReadChangeStreamPartitionAction(
      MetadataTableDao metadataTableDao,
      ChangeStreamDao changeStreamDao,
      ChangeStreamMetrics metrics,
      ChangeStreamAction changeStreamAction,
      Duration heartbeatDuration) {
    this.metadataTableDao = metadataTableDao;
    this.changeStreamDao = changeStreamDao;
    this.metrics = metrics;
    this.changeStreamAction = changeStreamAction;
    this.heartbeatDuration = heartbeatDuration;
  }

  /**
   * Streams changes from a specific partition. This function is responsible to maintaining the
   * lifecycle of streaming the partition. We delegate to {@link ChangeStreamAction} to process
   * individual response from the change stream.
   *
   * <p>Before we send a request to Cloud Bigtable to stream the partition, we need to perform a few
   * things.
   *
   * <ol>
   *   <li>Lock the partition. Due to the design of the change streams connector, it is possible
   *       that multiple DoFn are started trying to stream the same partition. However, only 1 DoFn
   *       should be streaming a partition. So we solve this by using the metadata table as a
   *       distributed lock. We attempt to lock the partition for this DoFn's UUID. If it is
   *       successful, it means this DoFn is the only one that can stream the partition and
   *       continue. Otherwise, terminate this DoFn because another DoFn is streaming this partition
   *       already.
   *   <li>Process CloseStream if it exists. In order to solve a possible inconsistent state
   *       problem, we do not process CloseStream after receiving it. We claim the CloseStream in
   *       the RestrictionTracker so it persists after a checkpoint. We checkpoint to flush all the
   *       DataChanges. Then on resume, we process the CloseStream. There is only 1 expected Status
   *       for CloseStream: Out of Range. Out of Range is returned when the partition has either
   *       been split into more partitions or merged into a larger partition. In this case, we write
   *       to the metadata table the new partitions' information so that {@link
   *       DetectNewPartitionsDoFn} can read and output those new partitions to be streamed. We also
   *       need to ensure we clean up this partition's metadata to release the lock.
   *   <li>Update the metadata table with the watermark and additional debugging info.
   *   <li>Stream the partition.
   * </ol>
   *
   * @param partitionRecord partition information used to identify this stream
   * @param tracker restriction tracker of {@link
   *     org.apache.beam.sdk.io.gcp.bigtable.changestreams.dofn.ReadChangeStreamPartitionDoFn}
   * @param receiver output receiver for {@link
   *     org.apache.beam.sdk.io.gcp.bigtable.changestreams.dofn.ReadChangeStreamPartitionDoFn}
   * @param watermarkEstimator watermark estimator {@link
   *     org.apache.beam.sdk.io.gcp.bigtable.changestreams.dofn.ReadChangeStreamPartitionDoFn}
   * @return {@link ProcessContinuation#stop} if a checkpoint is required or the stream has
   *     completed. Or {@link ProcessContinuation#resume} if a checkpoint is required.
   * @throws IOException when stream fails.
   */
  public ProcessContinuation run(
      PartitionRecord partitionRecord,
      RestrictionTracker<StreamProgress, StreamProgress> tracker,
      DoFn.OutputReceiver<KV<ByteString, ChangeStreamMutation>> receiver,
      ManualWatermarkEstimator<Instant> watermarkEstimator)
      throws IOException {
    // Watermark being delayed beyond 5 minutes signals a possible problem.
    boolean shouldDebug =
        watermarkEstimator.getState().plus(Duration.standardMinutes(5)).isBeforeNow();

    if (shouldDebug) {
      LOG.info(
          "RCSP: Partition: "
              + partitionRecord
              + "\n Watermark: "
              + watermarkEstimator.getState()
              + "\n RestrictionTracker: "
              + tracker.currentRestriction());
    }

    // Process CloseStream if it exists
    CloseStream closeStream = tracker.currentRestriction().getCloseStream();
    if (closeStream != null) {
      if (closeStream.getStatus().getCode() != Status.Code.OUT_OF_RANGE) {
        LOG.error(
            "RCSP {}: Reached unexpected terminal state: {}",
            formatByteStringRange(partitionRecord.getPartition()),
            closeStream.getStatus());
        metrics.decPartitionStreamCount();
        return ProcessContinuation.stop();
      }
      // The partitions in the continuation tokens should be a superset of this partition.
      // If there's only 1 token, then the token's partition should be a superset of this partition.
      // If there are more than 1 tokens, then the tokens should form a continuous row range that is
      // a superset of this partition.
      List<Range.ByteStringRange> partitions = new ArrayList<>();
      for (ChangeStreamContinuationToken changeStreamContinuationToken :
          closeStream.getChangeStreamContinuationTokens()) {
        partitions.add(changeStreamContinuationToken.getPartition());
        metadataTableDao.writeNewPartition(
            changeStreamContinuationToken,
            partitionRecord.getPartition(),
            watermarkEstimator.getState());
      }
      if (shouldDebug) {
        LOG.info(
            "RCSP {}: Split/Merge into {}",
            formatByteStringRange(partitionRecord.getPartition()),
            partitionsToString(partitions));
      }
      if (!isSuperset(partitions, partitionRecord.getPartition())) {
        LOG.warn(
            "RCSP {}: CloseStream has child partition(s) {} that doesn't cover the keyspace",
            formatByteStringRange(partitionRecord.getPartition()),
            partitionsToString(partitions));
      }
      metadataTableDao.deleteStreamPartitionRow(partitionRecord.getPartition());
      metrics.decPartitionStreamCount();
      return ProcessContinuation.stop();
    }

    // Update the metadata table with the watermark
    metadataTableDao.updateWatermark(
        partitionRecord.getPartition(),
        watermarkEstimator.getState(),
        tracker.currentRestriction().getCurrentToken());

    // Start to stream the partition.
    ServerStream<ChangeStreamRecord> stream = null;
    try {
      stream =
          changeStreamDao.readChangeStreamPartition(
              partitionRecord, tracker.currentRestriction(), heartbeatDuration, shouldDebug);
      for (ChangeStreamRecord record : stream) {
        Optional<ProcessContinuation> result =
            changeStreamAction.run(
                partitionRecord, record, tracker, receiver, watermarkEstimator, shouldDebug);
        // changeStreamAction will usually return Optional.empty() except for when a checkpoint
        // (either runner or pipeline initiated) is required.
        if (result.isPresent()) {
          return result.get();
        }
      }
    } catch (Exception e) {
      throw e;
    } finally {
      if (stream != null) {
        stream.cancel();
      }
    }
    return ProcessContinuation.resume();
  }
}
