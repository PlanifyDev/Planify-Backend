import { DB } from "../datastore";
import * as type from "../contracts/types";
import * as api from "../contracts/api";
import * as help from "../helpers";
import { cache } from "../cache";
import AWS from "aws-sdk";

// ----------------- update name handler ------------------------------
export const updateAllHandler: type.myHandlerWithParam<
  api.UpdateAllParam,
  api.UpdateAllReq,
  api.UpdateAllRes
> = async (req, res, next) => {
  // ------ check validation of new data -------
  const notValidMsg = help.notValid(
    { firstname: req.body.firstname },
    { lastname: req.body.lastname },
    { password: req.body.password }
  );
  if (notValidMsg) {
    return res.status(400).send({ error: notValidMsg as string });
  }

  // -------------------------------------------

  // ----------- get user data from DB --------
  let user: type.User;
  try {
    user = await DB.getUserById(res.locals.userId);
  } catch (error) {
    return next(error);
  }

  const firstname = req.body.firstname || user.firstname;
  const lastname = req.body.lastname || user.lastname;
  let password = user.password;

  // ---- if he need to change password must pass old password ---------
  if (req.body.password) {
    if (!req.body.oldPassword) {
      return res
        .status(400)
        .send({ error: "Old password is required to update " });
    }

    if (help.notValid({ password: req.body.oldPassword })) {
      return res.status(400).send({ error: "Wrong password" });
    }

    // ------------ check if old password is correct -----------
    const isMatch = await help.comparePassword(
      req.body.oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).send({ error: "Wrong password" });
    }

    // ---- hash new password to save in DB -------------------
    password = await help.hashPassword(req.body.password);
  }

  const newUser: type.UserUpdateData = {
    firstname,
    lastname,
    password,
  };
  // ------------- update name in cache ----------------------

  await cache.updateNameCache(user.id, firstname, lastname).catch((error) => {
    return next(error);
  });

  // ------------- send new data to update db ---------------
  await DB.updateAllData(user.id, newUser).catch((error) => {
    return next(error);
  });
  return res.sendStatus(200);
};

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
  AWS.config.update({
    accessKeyId: help.accessEnv("AWS_ACCESS_KEY"),
    secretAccessKey: help.accessEnv("AWS_SECRET_KEY"),
    region: "us-east-1",
  });

  const s3 = new AWS.S3();
  const params = {
    Bucket: help.accessEnv("AWS_S3_BUCKET_NAME"),
    Key: userId,
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      return next(err);
    }
  });

  return res.sendStatus(200);
};

// ----------------- get user handler ------------------------------
export const getUserHandler: type.myHandlerWithParam<
  api.GetUserDataParam,
  api.GetUserDataReq,
  api.GetUserDataRes
> = async (req, res, next) => {
  const userId = req.params.id;
  let user: type.UserCacheData;
  try {
    // get user from cache
    user = await cache.getCachedUser(userId);
  } catch (error) {
    return next(error);
  }
  return res.status(200).send({ user });
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
