import grpc from "grpc";
import { authServiceClient } from "../proto_out/auth_grpc_pb";
import { AuthorizationReq, AuthorizationRes } from "../proto_out/auth_pb";

// import dotenv from "dotenv";
// import { AuthorizationReq } from './../proto_out/auth_pb.d';
// dotenv.config();
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "1";
const PORT = process.env.AUTH_GRPC_PORT;

const client = new authServiceClient(
  `localhost:5000`,
  grpc.credentials.createInsecure()
);

export const authorization = (jwt: string) => {
  return new Promise((resolve, reject) => {
    const request = new AuthorizationReq();
    request.setJwt(jwt);
    client.authorization(request, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response.getUserId());
    });
  });
};

// authorization(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNzBiYWYyYi1kYTE2LTQ1MzktOGVhYi01ZjBiZThlZjRkOGUiLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTY3MTQ4MTMzMSwiZXhwIjoxNzAzMDM4OTMxfQ.9to5VfFdgTvTe6dXMV4gAiG8HXst6RINYYwX3eDACOI"
// )
//   .then((user_id) => {
//     console.log(user_id);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
