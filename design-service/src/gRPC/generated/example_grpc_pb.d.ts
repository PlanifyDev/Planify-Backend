// package: example
// file: example.proto

import * as grpc from 'grpc';
import * as example_pb from './example_pb';

interface IExampleServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  sayHello: IExampleServiceService_ISayHello;
}

interface IExampleServiceService_ISayHello extends grpc.MethodDefinition<example_pb.HelloRequest, example_pb.HelloResponse> {
  path: '/example.ExampleService/SayHello'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<example_pb.HelloRequest>;
  requestDeserialize: grpc.deserialize<example_pb.HelloRequest>;
  responseSerialize: grpc.serialize<example_pb.HelloResponse>;
  responseDeserialize: grpc.deserialize<example_pb.HelloResponse>;
}

export const ExampleServiceService: IExampleServiceService;
export interface IExampleServiceServer extends grpc.UntypedServiceImplementation {
  sayHello: grpc.handleUnaryCall<example_pb.HelloRequest, example_pb.HelloResponse>;
}

export interface IExampleServiceClient {
  sayHello(request: example_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: example_pb.HelloResponse) => void): grpc.ClientUnaryCall;
  sayHello(request: example_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: example_pb.HelloResponse) => void): grpc.ClientUnaryCall;
  sayHello(request: example_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: example_pb.HelloResponse) => void): grpc.ClientUnaryCall;
}

export class ExampleServiceClient extends grpc.Client implements IExampleServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public sayHello(request: example_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: example_pb.HelloResponse) => void): grpc.ClientUnaryCall;
  public sayHello(request: example_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: example_pb.HelloResponse) => void): grpc.ClientUnaryCall;
  public sayHello(request: example_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: example_pb.HelloResponse) => void): grpc.ClientUnaryCall;
}

