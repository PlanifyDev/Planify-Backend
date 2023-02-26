import grpc from "grpc";
import {
  ExampleServiceService,
  IExampleServiceServer,
} from "./generated/example_grpc_pb";
import { HelloRequest, HelloResponse } from "./generated/example_pb";
class ImpExampleService implements IExampleServiceServer {
  constructor() {
    console.log(`grpc server is running on port 5001 ....`);
  }
  [name: string]: grpc.handleCall<any, any>;
  sayHello(
    call: grpc.ServerUnaryCall<HelloRequest>,
    callback: grpc.sendUnaryData<HelloResponse>
  ) {
    const reply = new HelloResponse();
    reply.setMessage(`Hello ${call.request.getName()}`);
    callback(null, reply);
  }
}

const server = new grpc.Server();
server.addService(ExampleServiceService, new ImpExampleService());
server.bind("localhost:5001", grpc.ServerCredentials.createInsecure());

server.start();
