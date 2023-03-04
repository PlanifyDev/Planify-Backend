// package: auth
// file: auth.proto

import * as grpc from "grpc";
import * as auth_pb from "./auth_pb";

interface Iupdate_plan_serviceService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  update_plan: Iupdate_plan_serviceService_Iupdate_plan;
}

interface Iupdate_plan_serviceService_Iupdate_plan
  extends grpc.MethodDefinition<
    auth_pb.update_plan_req,
    auth_pb.update_plan_res
  > {
  path: "/auth.update_plan_service/update_plan";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<auth_pb.update_plan_req>;
  requestDeserialize: grpc.deserialize<auth_pb.update_plan_req>;
  responseSerialize: grpc.serialize<auth_pb.update_plan_res>;
  responseDeserialize: grpc.deserialize<auth_pb.update_plan_res>;
}

export const update_plan_serviceService: Iupdate_plan_serviceService;
export interface Iupdate_plan_serviceServer
  extends grpc.UntypedServiceImplementation {
  update_plan: grpc.handleUnaryCall<
    auth_pb.update_plan_req,
    auth_pb.update_plan_res
  >;
}

export interface Iupdate_plan_serviceClient {
  update_plan(
    request: auth_pb.update_plan_req,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.update_plan_res
    ) => void
  ): grpc.ClientUnaryCall;
  update_plan(
    request: auth_pb.update_plan_req,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.update_plan_res
    ) => void
  ): grpc.ClientUnaryCall;
  update_plan(
    request: auth_pb.update_plan_req,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.update_plan_res
    ) => void
  ): grpc.ClientUnaryCall;
}

export class update_plan_serviceClient
  extends grpc.Client
  implements Iupdate_plan_serviceClient
{
  constructor(address: string, credentials: grpc.ChannelCredentials);
  public update_plan(
    request: auth_pb.update_plan_req,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.update_plan_res
    ) => void
  ): grpc.ClientUnaryCall;
  public update_plan(
    request: auth_pb.update_plan_req,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.update_plan_res
    ) => void
  ): grpc.ClientUnaryCall;
  public update_plan(
    request: auth_pb.update_plan_req,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.update_plan_res
    ) => void
  ): grpc.ClientUnaryCall;
}
