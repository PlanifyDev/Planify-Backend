import { DB } from "../datastore";
import * as type from "../contracts/types";
import * as api from "../contracts/api";
import * as help from "../helpers";
import { cache } from "../cache";
import AWS from "aws-sdk";

// ----------------- delete user handler ------------------------------
export const deleteUserHandler: type.myHandlerWithParam<
  api.DeleteUserParam,
  api.DeleteUserReq,
  api.DeleteUserRes
> = async (req, res, next) => {
  const userId = res.locals.userId;
  // -------------- delete user from cache ----------------
  await cache.signOutCache(userId).catch((err) => {
    return next(err);
  });

  // -------------- delete user from DB ----------------
  await DB.deleteUser(userId).catch((err) => {
    return next(err);
  });

  // -------------- delete user from S3 ----------------
  // AWS.config.update({
  //   accessKeyId: help.accessEnv("AWS_ACCESS_KEY"),
  //   secretAccessKey: help.accessEnv("AWS_SECRET_KEY"),
  //   region: "us-east-1",
  // });

  // const s3 = new AWS.S3();
  // const params = {
  //   Bucket: help.accessEnv("AWS_S3_BUCKET_NAME"),
  //   Key: userId,
  // };

  // s3.deleteObject(params, (err, data) => {
  //   if (err) {
  //     return next(err);
  //   }
  // });

  return res.sendStatus(200);
};

// ----------------- delete all users from db ------------------------------
export const cleardb: type.myHandler<never, never> = async (req, res, next) => {
  await DB.clearUsers()
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      return next(err);
    });
};
