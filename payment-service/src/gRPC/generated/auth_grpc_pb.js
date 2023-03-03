// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var auth_pb = require('./auth_pb.js');

function serialize_auth_update_plan_req(arg) {
  if (!(arg instanceof auth_pb.update_plan_req)) {
    throw new Error('Expected argument of type auth.update_plan_req');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_update_plan_req(buffer_arg) {
  return auth_pb.update_plan_req.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_auth_update_plan_res(arg) {
  if (!(arg instanceof auth_pb.update_plan_res)) {
    throw new Error('Expected argument of type auth.update_plan_res');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_update_plan_res(buffer_arg) {
  return auth_pb.update_plan_res.deserializeBinary(new Uint8Array(buffer_arg));
}


var update_plan_serviceService = exports.update_plan_serviceService = {
  update_plan: {
    path: '/auth.update_plan_service/update_plan',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.update_plan_req,
    responseType: auth_pb.update_plan_res,
    requestSerialize: serialize_auth_update_plan_req,
    requestDeserialize: deserialize_auth_update_plan_req,
    responseSerialize: serialize_auth_update_plan_res,
    responseDeserialize: deserialize_auth_update_plan_res,
  },
};

exports.update_plan_serviceClient = grpc.makeGenericClientConstructor(update_plan_serviceService);
