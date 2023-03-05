import grpc from "grpc";
import { update_plan_serviceClient } from "../generated//auth_grpc_pb";
import { update_plan_req, update_plan_res } from "../generated//auth_pb";
import * as help from "../../helpers";
const AUTH_GRPC_URL = help.accessEnv("AUTH_GRPC_URL");

const client = new update_plan_serviceClient(
  AUTH_GRPC_URL,
  grpc.credentials.createInsecure()
);

export const update_plan = (user_id: string, user_plan: string) => {
  return new Promise((resolve, reject) => {
    const request = new update_plan_req();
    request.setUserId(user_id);
    request.setUserPlan(user_plan);
    client.update_plan(request, (error, response) => {
      if (error) {
        console.log(error);
        return reject(response.getStatus());
      }
      return resolve(response.getStatus());
    });
  });
};
