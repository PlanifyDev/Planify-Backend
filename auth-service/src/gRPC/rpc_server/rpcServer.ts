import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { DB } from "../../datastore";
import path from "path";

//path to our proto file
// const PROTO_FILE: string = "../proto/auth.proto";
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

//create gRPC server
const server: grpc.Server = new grpc.Server();

//implement auth service
server.addService(authProto.update_plan_service.service, {
  //implement update_plan
  update_plan: (input: any, callback: any) => {
    const user_id = input.request.user_id;
    const user_plan = input.request.user_plan;
    console.log(">>> update_plan request received", "- message:", {
      user_id,
      user_plan,
    });

    if (!user_id || !user_plan) {
      console.log(
        ">>> update_plan request failed",
        "- error:",
        "user_id or user_plan is missing"
      );
      return callback(new Error("user_id or user_plan is missing"), null);
    }

    DB.updatePlan(user_id, user_plan)
      .then(() => {
        console.log(">>> update_plan request success");
        return callback(null, { status: true });
      })
      .catch((error) => {
        console.log(">>> update_plan request failed", "- error:", error);
        return callback(error, { status: false });
      });
  },
});

//start the Server
server.bindAsync(
  //port to serve on
  "0.0.0.0:5000",
  //authentication settings
  grpc.ServerCredentials.createInsecure(),
  //server start callback
  (error, port) => {
    console.log(`>>> grpc server listening on port ${port}`);
    server.start();
  }
);
