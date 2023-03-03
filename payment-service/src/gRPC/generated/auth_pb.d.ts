// package: auth
// file: auth.proto

import * as jspb from 'google-protobuf';

export class update_plan_req extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getUserPlan(): string;
  setUserPlan(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): update_plan_req.AsObject;
  static toObject(includeInstance: boolean, msg: update_plan_req): update_plan_req.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: update_plan_req, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): update_plan_req;
  static deserializeBinaryFromReader(message: update_plan_req, reader: jspb.BinaryReader): update_plan_req;
}

export namespace update_plan_req {
  export type AsObject = {
    userId: string,
    userPlan: string,
  }
}

export class update_plan_res extends jspb.Message {
  getStatus(): boolean;
  setStatus(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): update_plan_res.AsObject;
  static toObject(includeInstance: boolean, msg: update_plan_res): update_plan_res.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: update_plan_res, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): update_plan_res;
  static deserializeBinaryFromReader(message: update_plan_res, reader: jspb.BinaryReader): update_plan_res;
}

export namespace update_plan_res {
  export type AsObject = {
    status: boolean,
  }
}

