// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var auth_pb = require('./auth_pb.js');

function serialize_auth_AuthorizationReq(arg) {
  if (!(arg instanceof auth_pb.AuthorizationReq)) {
    throw new Error('Expected argument of type auth.AuthorizationReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_AuthorizationReq(buffer_arg) {
  return auth_pb.AuthorizationReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_auth_AuthorizationRes(arg) {
  if (!(arg instanceof auth_pb.AuthorizationRes)) {
    throw new Error('Expected argument of type auth.AuthorizationRes');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_AuthorizationRes(buffer_arg) {
  return auth_pb.AuthorizationRes.deserializeBinary(new Uint8Array(buffer_arg));
}


var authServiceService = exports.authServiceService = {
  authorization: {
    path: '/auth.authService/Authorization',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.AuthorizationReq,
    responseType: auth_pb.AuthorizationRes,
    requestSerialize: serialize_auth_AuthorizationReq,
    requestDeserialize: deserialize_auth_AuthorizationReq,
    responseSerialize: serialize_auth_AuthorizationRes,
    responseDeserialize: deserialize_auth_AuthorizationRes,
  },
};

exports.authServiceClient = grpc.makeGenericClientConstructor(authServiceService);
