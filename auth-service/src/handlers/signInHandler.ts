import { DB } from "../datastore";
import * as type from "../contracts/types";
import * as api from "../contracts/api";
import * as help from "../helpers";
import { cache } from "../cache";

export const signInHandler: type.myHandler<
  api.SignInReq,
  api.SignInRes
> = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  // ---------------- check if all field is existing ----------------
  if (!email || !password) {
    return res.status(400).send({ error: help.ERRORS.WRONG_LOGIN });
  }

  // ---------------- check if all inputs is valid ----------------
  const notValidMessage = help.notValid({ email }, { password });
  if (notValidMessage) {
    return res.status(400).send({ error: notValidMessage as string });
  }

  // -------------- get user from db -------------------------
  let existing: type.User;
  try {
    existing = await DB.getUserByEmail(email);
  } catch (error) {
    return next(error);
  }

  if (!existing) {
    return res.status(403).send({ error: help.ERRORS.WRONG_LOGIN });
  }

  // ---------- check if password is correct or not ------------
  const isMatch = await help.comparePassword(password, existing.password);
  if (!existing || !isMatch) {
    return res.status(403).send({ error: help.ERRORS.WRONG_LOGIN });
  }

  // ignore password in response "type.UserRes = Omit<type.User, 'password'>"
  const { password: _, ...user } = existing;

  // create token without expire date
  const jwt = help.createToken({
    userId: existing.id,
    verified: existing.verified,
  });

  // create date for cache
  const username = existing.firstname + " " + existing.lastname;
  const cacheUser: type.UserCacheData = {
    ...user,
    user_token: jwt,
  };

  // cache user data
  await cache
    .cacheUser(existing.id, cacheUser)
    .then(() => {
      console.log("user cached successfully ... ");
    })
    .catch((err) => {
      console.log("error in caching user", err);
      next(err);
    });

  return res.status(200).send({ user, jwt });
};
