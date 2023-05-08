import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import * as help from "../../helpers";
const AI_GRPC_URL = help.accessEnv("AI_GRPC_URL");
import * as type from "../../contracts/types";
// path to our proto file
const PROTO_FILE: string = path.join(__dirname, "../proto/ai_service.proto");

const options: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const pkgDefs: protoLoader.PackageDefinition = protoLoader.loadSync(
  PROTO_FILE,
  options
);

//ai_service is the package name in our proto file
const aiService: any = grpc.loadPackageDefinition(pkgDefs).ai_service;

// create client
const client = new aiService.AI(AI_GRPC_URL, grpc.credentials.createInsecure());

export const create_project = (
  boundary: string,
  door_position: string,
  area: string
): Promise<type.AiProjectResponse> => {
  return new Promise((resolve, reject) => {
    const request = { boundary, door_position, area };
    client.create_project(request, (err: any, response: any) => {
      if (err) {
        console.log(err);
        return reject(response.status);
      }
      return resolve(response);
    });
  });
};

export const create_version = (
  boundary: string,
  door_position: string,
  area: string,
  constraints: string
): Promise<type.AiVersionResponse> => {
  return new Promise((resolve, reject) => {
    const request = { boundary, door_position, area, constraints };
    client.create_version(request, (err: any, response: any) => {
      if (err) {
        console.log(err);
        return reject(response.status);
      }
      return resolve(response);
    });
  });
};
