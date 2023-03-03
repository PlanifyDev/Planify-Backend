import grpc from "grpc";
import * as help from "../../helpers/accessEnv";
import { DB } from "../../datastore";

const PORT = help.accessEnv("AUTH_GRPC_PORT");

import {
  Iupdate_plan_serviceServer,
  update_plan_serviceService,
} from "../generated/auth_grpc_pb";

import { update_plan_req, update_plan_res } from "../generated/auth_pb";

class Imp_update_plan_serviceServer implements Iupdate_plan_serviceServer {
  constructor() {
    console.log(`>>> grpc server is running on port ${PORT} ....`);
  }
  [name: string]: grpc.handleCall<any, any>;

  update_plan(
    call: grpc.ServerUnaryCall<update_plan_req>,
    callback: grpc.sendUnaryData<update_plan_res>
  ) {
    console.log(
      ">>> update_plan request received",
      "- message:",
      call.request.toObject()
    );
    const user_id = call.request.getUserId();
    const user_plan = call.request.getUserPlan();
    const res = new update_plan_res();

    if (!user_id || !user_plan) {
      console.log(
        ">>> update_plan request failed",
        "- error:",
        "user_id or user_plan is missing"
      );
      res.setStatus(false);
      return callback(new Error("user_id or user_plan is missing"), res);
    }

    DB.updatePlan(user_id, user_plan)
      .then(() => {
        console.log(">>> update_plan request success");
        res.setStatus(true);
        return callback(null, res);
      })
      .catch((error) => {
        console.log(">>> update_plan request failed", "- error:", error);
        res.setStatus(false);
        return callback(error, res);
      });
  }
}

const server = new grpc.Server();

server.addService(
  update_plan_serviceService,
  new Imp_update_plan_serviceServer()
);

server.bind(`localhost:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
