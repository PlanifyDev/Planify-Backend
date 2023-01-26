// package: auth
// file: auth.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class AuthorizationReq extends jspb.Message { 
    getJwt(): string;
    setJwt(value: string): AuthorizationReq;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthorizationReq.AsObject;
    static toObject(includeInstance: boolean, msg: AuthorizationReq): AuthorizationReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthorizationReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthorizationReq;
    static deserializeBinaryFromReader(message: AuthorizationReq, reader: jspb.BinaryReader): AuthorizationReq;
}

export namespace AuthorizationReq {
    export type AsObject = {
        jwt: string,
    }
}

export class AuthorizationRes extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): AuthorizationRes;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthorizationRes.AsObject;
    static toObject(includeInstance: boolean, msg: AuthorizationRes): AuthorizationRes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthorizationRes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthorizationRes;
    static deserializeBinaryFromReader(message: AuthorizationRes, reader: jspb.BinaryReader): AuthorizationRes;
}

export namespace AuthorizationRes {
    export type AsObject = {
        userId: string,
    }
}
