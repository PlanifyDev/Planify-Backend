import { DB } from "../datastore";
import { myHandler, JwtPayload } from "../contracts/types";
import { SendEmailRes, Verify } from "../contracts/api";
import * as help from "../helpers";
import { cache } from "../cache";

export const sendEmailHandler: myHandler<never, SendEmailRes> = async (
  _,
  res
) => {
  const userId = res.locals.userId;
  const user = await DB.getUserById(userId);

  // create verification token with expire date
  const jwt = help.createToken({ userId: user.id, verified: false }, "1d");

  // send verification email to user
  const fullName = user.firstname + " " + user.lastname;
  help.sendEmail(user.email, jwt, fullName);

  return res.sendStatus(200);
};

export const verifyHandler: myHandler<never, Verify> = async (
  req,
  res,
  next
) => {
  const token = req.query.key as string;
  if (!token) {
    return res.status(401).send({ error: help.ERRORS.BAD_VERIFY_RUL });
  }

  let payload: JwtPayload;

  try {
    payload = help.verifyToken(token);
  } catch (error) {
    return res.status(401).send({ error: help.ERRORS.BAD_VERIFY_RUL });
  }

  const user = await DB.getUserById(payload.userId);
  if (!user) {
    return res.status(401).send({ error: help.ERRORS.BAD_VERIFY_RUL });
  }

  // update user verification status in DB and cache
  await DB.updateVerification(payload.userId)
    .then(async () => {
      await cache.updateVerificationCache(payload.userId, "true");
    })
    .catch((error) => {
      return next(error);
    });

  return res.redirect("http://localhost:3000/test");
};
