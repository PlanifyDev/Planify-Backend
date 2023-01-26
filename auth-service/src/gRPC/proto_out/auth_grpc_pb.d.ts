// package: auth
// file: auth.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as auth_pb from "./auth_pb";

interface IauthServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    authorization: IauthServiceService_IAuthorization;
}

interface IauthServiceService_IAuthorization extends grpc.MethodDefinition<auth_pb.AuthorizationReq, auth_pb.AuthorizationRes> {
    path: "/auth.authService/Authorization";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.AuthorizationReq>;
    requestDeserialize: grpc.deserialize<auth_pb.AuthorizationReq>;
    responseSerialize: grpc.serialize<auth_pb.AuthorizationRes>;
    responseDeserialize: grpc.deserialize<auth_pb.AuthorizationRes>;
}

export const authServiceService: IauthServiceService;

export interface IauthServiceServer {
    authorization: grpc.handleUnaryCall<auth_pb.AuthorizationReq, auth_pb.AuthorizationRes>;
}

export interface IauthServiceClient {
    authorization(request: auth_pb.AuthorizationReq, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthorizationRes) => void): grpc.ClientUnaryCall;
    authorization(request: auth_pb.AuthorizationReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthorizationRes) => void): grpc.ClientUnaryCall;
    authorization(request: auth_pb.AuthorizationReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthorizationRes) => void): grpc.ClientUnaryCall;
}

export class authServiceClient extends grpc.Client implements IauthServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public authorization(request: auth_pb.AuthorizationReq, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthorizationRes) => void): grpc.ClientUnaryCall;
    public authorization(request: auth_pb.AuthorizationReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthorizationRes) => void): grpc.ClientUnaryCall;
    public authorization(request: auth_pb.AuthorizationReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.AuthorizationRes) => void): grpc.ClientUnaryCall;
}
