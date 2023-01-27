import grpc from "grpc";
import * as util from "../utils";
import dotenv from "dotenv";
dotenv.config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "1";
const PORT = process.env.AUTH_GRPC_PORT;

import {
  IauthServiceServer,
  authServiceService,
} from "../proto_out/auth_grpc_pb";
import { AuthorizationReq, AuthorizationRes } from "../proto_out/auth_pb";

class ImpAuthService implements IauthServiceServer {
  constructor() {
    console.log(`grpc server is running on port ${PORT} ....`);
  }
  authorization(
    call: grpc.ServerUnaryCall<AuthorizationReq>,
    callback: grpc.sendUnaryData<AuthorizationRes>
  ): void {
    const jwt = call.request.getJwt();
    const response = new AuthorizationRes();

    util
      .verifyJwt(jwt)
      .then((user) => {
        response.setUserId(user.user_id);
        return callback(null, response);
      })
      .catch((err) => {
        const error: grpc.ServiceError = {
          name: "user missing",
          message: err,
        };
        return callback(error, null);
      });
  }
}

const server = new grpc.Server();
server.addService(authServiceService, new ImpAuthService());

server.bind(`localhost:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
