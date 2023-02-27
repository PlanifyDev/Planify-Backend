import { DB } from "../datastore";
import { myHandlerWithParam } from "../contracts/types";
import * as api from "../contracts/api";
import * as help from "../helpers";
import { cache } from "../cache";

export const resendVerificationHandler: myHandlerWithParam<
  api.resendVerificationParam,
  api.resendVerificationReq,
  api.resendVerificationRes
> = async (_, res, next) => {
  const userId = res.locals.userId;
  const user = await cache.getCachedUser(userId);

  // ---------------- create random 6-digits code ----------------
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  // ---------------- save verification code in cache ----------------
  await cache.addVerificationCode(userId, verificationCode).catch((error) => {
    return next(error);
  });

  // ---------------- send verification email to user ----------------
  const fullName = user.username;
  help.sendEmail(user.email, verificationCode, fullName);

  return res.sendStatus(200);
};

export const verifyHandler: myHandlerWithParam<
  api.VerifyParam,
  api.VerifyReq,
  api.VerifyRes
> = async (req, res, next) => {
  const userId = res.locals.userId;
  const { verificationCode } = req.body;

  // get verification code from cache
  const verificationCode_cache = await cache.getVerificationCode(userId);

  // check if verification code is correct
  if (verificationCode != verificationCode_cache) {
    return res.status(401).send({ error: "Incorrect Verification Code" });
  }

  // create token without expire date
  const jwt = help.createToken({
    userId: userId,
    verified: true,
  });

  // update user verification status in DB and cache and update "token" in cache
  await DB.updateVerification(userId)
    .then(async () => {
      await cache.updateVerificationCache(userId, jwt);
    })
    .catch((error) => {
      return next(error);
    });

  // delete verification code from cache
  await cache.deleteVerificationCode(userId);

  return res.status(200).send({ jwt });
};
