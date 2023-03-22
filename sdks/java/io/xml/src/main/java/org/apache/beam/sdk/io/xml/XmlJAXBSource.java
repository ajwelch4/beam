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
package org.apache.beam.sdk.io.xml;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.SequenceInputStream;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.NoSuchElementException;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.FactoryConfigurationError;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import org.apache.beam.sdk.coders.Coder;
import org.apache.beam.sdk.io.FileBasedSource;
import org.apache.beam.sdk.io.Source;
import org.apache.beam.sdk.io.fs.MatchResult.Metadata;
import org.apache.beam.sdk.options.PipelineOptions;
import org.apache.beam.sdk.options.ValueProvider;
import org.codehaus.stax2.XMLInputFactory2;

/** Implementation of {@link XmlIO#read}. */
@SuppressWarnings({
  "nullness" // TODO(https://github.com/apache/beam/issues/20497)
})
public class XmlSource<T> extends FileBasedSource<T> {

  private static final String XML_VERSION = "1.1";

  private final XmlIO.MappingConfiguration<T> configuration;

  XmlSource(
      ValueProvider<String> spec,
      XmlIO.MappingConfiguration<T> configuration,
      long minBundleSizeBytes) {
    super(spec, minBundleSizeBytes);
    this.configuration = configuration;
  }

  private XmlSource(
      XmlIO.MappingConfiguration<T> configuration,
      long minBundleSizeBytes,
      Metadata metadata,
      long startOffset,
      long endOffset) {
    super(metadata, minBundleSizeBytes, startOffset, endOffset);
    this.configuration = configuration;
  }

  @Override
  protected FileBasedSource<T> createForSubrangeOfFile(Metadata metadata, long start, long end) {
    return new XmlSource<>(configuration, getMinBundleSize(), metadata, start, end);
  }

  @Override
  protected FileBasedReader<T> createSingleFileReader(PipelineOptions options) {
    return new XMLReader<>(this);
  }

  @Override
  public Coder<T> getOutputCoder() {
    return JAXBCoder.of(configuration.getRecordClass());
  }

}
