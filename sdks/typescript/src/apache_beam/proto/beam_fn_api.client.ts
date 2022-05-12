// @generated by protobuf-ts 2.1.0 with parameter server_grpc1,generate_dependencies
// @generated from protobuf file "beam_fn_api.proto" (package "org.apache.beam.model.fn_execution.v1", syntax proto3)
// tslint:disable
//
//
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
//
//
// Protocol Buffers describing the Fn API and boostrapping.
//
// TODO: Usage of plural names in lists looks awkward in Java
// e.g. getOutputsMap, addCodersBuilder
//
// TODO: gRPC / proto field names conflict with generated code
// e.g. "class" in java, "output" in python
//
//
// TODO: Consider consolidating common components in another package
// and language namespaces for re-use with Runner Api.
//
import { BeamFnWorkerStatus } from "./beam_fn_api";
import type { WorkerStatusRequest } from "./beam_fn_api";
import type { WorkerStatusResponse } from "./beam_fn_api";
import { BeamFnExternalWorkerPool } from "./beam_fn_api";
import type { StopWorkerResponse } from "./beam_fn_api";
import type { StopWorkerRequest } from "./beam_fn_api";
import type { StartWorkerResponse } from "./beam_fn_api";
import type { StartWorkerRequest } from "./beam_fn_api";
import { BeamFnLogging } from "./beam_fn_api";
import type { LogControl } from "./beam_fn_api";
import type { LogEntry_List } from "./beam_fn_api";
import { BeamFnState } from "./beam_fn_api";
import type { StateResponse } from "./beam_fn_api";
import type { StateRequest } from "./beam_fn_api";
import { BeamFnData } from "./beam_fn_api";
import type { Elements } from "./beam_fn_api";
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { BeamFnControl } from "./beam_fn_api";
import type { ProcessBundleDescriptor } from "./beam_fn_api";
import type { GetProcessBundleDescriptorRequest } from "./beam_fn_api";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { InstructionRequest } from "./beam_fn_api";
import type { InstructionResponse } from "./beam_fn_api";
import type { DuplexStreamingCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
// 
// Control Plane API
// 
// Progress reporting and splitting still need further vetting. Also, this may
// change with the addition of new types of instructions/responses related to
// metrics.

/**
 * An API that describes the work that a SDK harness is meant to do.
 * Stable
 *
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnControl
 */
export interface IBeamFnControlClient {
    /**
     * Instructions sent by the runner to the SDK requesting different types
     * of work.
     *
     * @generated from protobuf rpc: Control(stream org.apache.beam.model.fn_execution.v1.InstructionResponse) returns (stream org.apache.beam.model.fn_execution.v1.InstructionRequest);
     */
    control(options?: RpcOptions): DuplexStreamingCall<InstructionResponse, InstructionRequest>;
    /**
     * Used to get the full process bundle descriptors for bundles one
     * is asked to process.
     *
     * @generated from protobuf rpc: GetProcessBundleDescriptor(org.apache.beam.model.fn_execution.v1.GetProcessBundleDescriptorRequest) returns (org.apache.beam.model.fn_execution.v1.ProcessBundleDescriptor);
     */
    getProcessBundleDescriptor(input: GetProcessBundleDescriptorRequest, options?: RpcOptions): UnaryCall<GetProcessBundleDescriptorRequest, ProcessBundleDescriptor>;
}
// 
// Control Plane API
// 
// Progress reporting and splitting still need further vetting. Also, this may
// change with the addition of new types of instructions/responses related to
// metrics.

/**
 * An API that describes the work that a SDK harness is meant to do.
 * Stable
 *
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnControl
 */
export class BeamFnControlClient implements IBeamFnControlClient, ServiceInfo {
    typeName = BeamFnControl.typeName;
    methods = BeamFnControl.methods;
    options = BeamFnControl.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * Instructions sent by the runner to the SDK requesting different types
     * of work.
     *
     * @generated from protobuf rpc: Control(stream org.apache.beam.model.fn_execution.v1.InstructionResponse) returns (stream org.apache.beam.model.fn_execution.v1.InstructionRequest);
     */
    control(options?: RpcOptions): DuplexStreamingCall<InstructionResponse, InstructionRequest> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<InstructionResponse, InstructionRequest>("duplex", this._transport, method, opt);
    }
    /**
     * Used to get the full process bundle descriptors for bundles one
     * is asked to process.
     *
     * @generated from protobuf rpc: GetProcessBundleDescriptor(org.apache.beam.model.fn_execution.v1.GetProcessBundleDescriptorRequest) returns (org.apache.beam.model.fn_execution.v1.ProcessBundleDescriptor);
     */
    getProcessBundleDescriptor(input: GetProcessBundleDescriptorRequest, options?: RpcOptions): UnaryCall<GetProcessBundleDescriptorRequest, ProcessBundleDescriptor> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetProcessBundleDescriptorRequest, ProcessBundleDescriptor>("unary", this._transport, method, opt, input);
    }
}
/**
 * Stable
 *
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnData
 */
export interface IBeamFnDataClient {
    /**
     * Used to send data between harnesses.
     *
     * @generated from protobuf rpc: Data(stream org.apache.beam.model.fn_execution.v1.Elements) returns (stream org.apache.beam.model.fn_execution.v1.Elements);
     */
    data(options?: RpcOptions): DuplexStreamingCall<Elements, Elements>;
}
/**
 * Stable
 *
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnData
 */
export class BeamFnDataClient implements IBeamFnDataClient, ServiceInfo {
    typeName = BeamFnData.typeName;
    methods = BeamFnData.methods;
    options = BeamFnData.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * Used to send data between harnesses.
     *
     * @generated from protobuf rpc: Data(stream org.apache.beam.model.fn_execution.v1.Elements) returns (stream org.apache.beam.model.fn_execution.v1.Elements);
     */
    data(options?: RpcOptions): DuplexStreamingCall<Elements, Elements> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<Elements, Elements>("duplex", this._transport, method, opt);
    }
}
/**
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnState
 */
export interface IBeamFnStateClient {
    /**
     * Used to get/append/clear state stored by the runner on behalf of the SDK.
     *
     * @generated from protobuf rpc: State(stream org.apache.beam.model.fn_execution.v1.StateRequest) returns (stream org.apache.beam.model.fn_execution.v1.StateResponse);
     */
    state(options?: RpcOptions): DuplexStreamingCall<StateRequest, StateResponse>;
}
/**
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnState
 */
export class BeamFnStateClient implements IBeamFnStateClient, ServiceInfo {
    typeName = BeamFnState.typeName;
    methods = BeamFnState.methods;
    options = BeamFnState.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * Used to get/append/clear state stored by the runner on behalf of the SDK.
     *
     * @generated from protobuf rpc: State(stream org.apache.beam.model.fn_execution.v1.StateRequest) returns (stream org.apache.beam.model.fn_execution.v1.StateResponse);
     */
    state(options?: RpcOptions): DuplexStreamingCall<StateRequest, StateResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<StateRequest, StateResponse>("duplex", this._transport, method, opt);
    }
}
/**
 * Stable
 *
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnLogging
 */
export interface IBeamFnLoggingClient {
    /**
     * Allows for the SDK to emit log entries which the runner can
     * associate with the active job.
     *
     * @generated from protobuf rpc: Logging(stream org.apache.beam.model.fn_execution.v1.LogEntry.List) returns (stream org.apache.beam.model.fn_execution.v1.LogControl);
     */
    logging(options?: RpcOptions): DuplexStreamingCall<LogEntry_List, LogControl>;
}
/**
 * Stable
 *
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnLogging
 */
export class BeamFnLoggingClient implements IBeamFnLoggingClient, ServiceInfo {
    typeName = BeamFnLogging.typeName;
    methods = BeamFnLogging.methods;
    options = BeamFnLogging.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * Allows for the SDK to emit log entries which the runner can
     * associate with the active job.
     *
     * @generated from protobuf rpc: Logging(stream org.apache.beam.model.fn_execution.v1.LogEntry.List) returns (stream org.apache.beam.model.fn_execution.v1.LogControl);
     */
    logging(options?: RpcOptions): DuplexStreamingCall<LogEntry_List, LogControl> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<LogEntry_List, LogControl>("duplex", this._transport, method, opt);
    }
}
/**
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnExternalWorkerPool
 */
export interface IBeamFnExternalWorkerPoolClient {
    /**
     * Start the SDK worker with the given ID.
     *
     * @generated from protobuf rpc: StartWorker(org.apache.beam.model.fn_execution.v1.StartWorkerRequest) returns (org.apache.beam.model.fn_execution.v1.StartWorkerResponse);
     */
    startWorker(input: StartWorkerRequest, options?: RpcOptions): UnaryCall<StartWorkerRequest, StartWorkerResponse>;
    /**
     * Stop the SDK worker.
     *
     * @generated from protobuf rpc: StopWorker(org.apache.beam.model.fn_execution.v1.StopWorkerRequest) returns (org.apache.beam.model.fn_execution.v1.StopWorkerResponse);
     */
    stopWorker(input: StopWorkerRequest, options?: RpcOptions): UnaryCall<StopWorkerRequest, StopWorkerResponse>;
}
/**
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnExternalWorkerPool
 */
export class BeamFnExternalWorkerPoolClient implements IBeamFnExternalWorkerPoolClient, ServiceInfo {
    typeName = BeamFnExternalWorkerPool.typeName;
    methods = BeamFnExternalWorkerPool.methods;
    options = BeamFnExternalWorkerPool.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * Start the SDK worker with the given ID.
     *
     * @generated from protobuf rpc: StartWorker(org.apache.beam.model.fn_execution.v1.StartWorkerRequest) returns (org.apache.beam.model.fn_execution.v1.StartWorkerResponse);
     */
    startWorker(input: StartWorkerRequest, options?: RpcOptions): UnaryCall<StartWorkerRequest, StartWorkerResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<StartWorkerRequest, StartWorkerResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * Stop the SDK worker.
     *
     * @generated from protobuf rpc: StopWorker(org.apache.beam.model.fn_execution.v1.StopWorkerRequest) returns (org.apache.beam.model.fn_execution.v1.StopWorkerResponse);
     */
    stopWorker(input: StopWorkerRequest, options?: RpcOptions): UnaryCall<StopWorkerRequest, StopWorkerResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<StopWorkerRequest, StopWorkerResponse>("unary", this._transport, method, opt, input);
    }
}
/**
 * API for SDKs to report debug-related statuses to runner during pipeline execution.
 *
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnWorkerStatus
 */
export interface IBeamFnWorkerStatusClient {
    /**
     * @generated from protobuf rpc: WorkerStatus(stream org.apache.beam.model.fn_execution.v1.WorkerStatusResponse) returns (stream org.apache.beam.model.fn_execution.v1.WorkerStatusRequest);
     */
    workerStatus(options?: RpcOptions): DuplexStreamingCall<WorkerStatusResponse, WorkerStatusRequest>;
}
/**
 * API for SDKs to report debug-related statuses to runner during pipeline execution.
 *
 * @generated from protobuf service org.apache.beam.model.fn_execution.v1.BeamFnWorkerStatus
 */
export class BeamFnWorkerStatusClient implements IBeamFnWorkerStatusClient, ServiceInfo {
    typeName = BeamFnWorkerStatus.typeName;
    methods = BeamFnWorkerStatus.methods;
    options = BeamFnWorkerStatus.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: WorkerStatus(stream org.apache.beam.model.fn_execution.v1.WorkerStatusResponse) returns (stream org.apache.beam.model.fn_execution.v1.WorkerStatusRequest);
     */
    workerStatus(options?: RpcOptions): DuplexStreamingCall<WorkerStatusResponse, WorkerStatusRequest> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<WorkerStatusResponse, WorkerStatusRequest>("duplex", this._transport, method, opt);
    }
}