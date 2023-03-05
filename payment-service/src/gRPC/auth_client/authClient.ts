import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import * as help from "../../helpers";
const AUTH_GRPC_URL = help.accessEnv("AUTH_GRPC_URL");

// path to our proto file
const PROTO_FILE: string = path.join(__dirname, "../proto/auth.proto");

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

//auth is the package name in our proto file
const authProto: any = grpc.loadPackageDefinition(pkgDefs).auth;
// console.log("authProto >>> ", authProto);
// const client = new authProto(AUTH_GRPC_URL, grpc.credentials.createInsecure());

// create client
const client = new authProto.update_plan_service(
  AUTH_GRPC_URL,
  grpc.credentials.createInsecure()
);

export const update_plan = (user_id: string, user_plan: string) => {
  return new Promise((resolve, reject) => {
    const request = { user_id, user_plan };
    client.update_plan(request, (error: any, response: any) => {
      if (error) {
        console.log(error);
        return reject(response.status);
      }
      return resolve(response.status);
    });
  });
};
