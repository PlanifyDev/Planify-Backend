import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import * as help from "../../helpers";
const AI_GRPC_URL = help.accessEnv("AI_GRPC_URL");

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

export const create_project = (boundary: string, door_position: string) => {
  return new Promise((resolve, reject) => {
    const request = { boundary, door_position };
    client.create_project(request, (err: any, response: any) => {
      if (err) {
        console.log(err);
        return reject(response.status);
      }
      return resolve(response);
    });
  });
};

create_project("my_boundary", "my_door_position").then((res) => {
  console.log(res);
});
