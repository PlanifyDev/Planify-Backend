// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var example_pb = require('./example_pb.js');

function serialize_example_HelloRequest(arg) {
  if (!(arg instanceof example_pb.HelloRequest)) {
    throw new Error('Expected argument of type example.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_example_HelloRequest(buffer_arg) {
  return example_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_example_HelloResponse(arg) {
  if (!(arg instanceof example_pb.HelloResponse)) {
    throw new Error('Expected argument of type example.HelloResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_example_HelloResponse(buffer_arg) {
  return example_pb.HelloResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ExampleServiceService = exports.ExampleServiceService = {
  sayHello: {
    path: '/example.ExampleService/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: example_pb.HelloRequest,
    responseType: example_pb.HelloResponse,
    requestSerialize: serialize_example_HelloRequest,
    requestDeserialize: deserialize_example_HelloRequest,
    responseSerialize: serialize_example_HelloResponse,
    responseDeserialize: deserialize_example_HelloResponse,
  },
};

exports.ExampleServiceClient = grpc.makeGenericClientConstructor(ExampleServiceService);
