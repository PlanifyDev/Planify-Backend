import crypto from "crypto";
import { DB } from "../datastore";
import * as type from "../contracts/types";
import { SignUpReq, SignupRes } from "../contracts/api";
import * as help from "../helpers";
import { cache } from "../cache";

export const signUpHandler: type.myHandler<SignUpReq, SignupRes> = async (
  req,
  res,
  next
) => {
  const { firstname, lastname, email, password } = req.body;

  // ---------------- check if all field is existing ----------------
  if (!firstname || !lastname || !email || !password) {
    return res
      .status(400)
      .send({ error: "Email, username, and password are required" });
  }

  // ---------------- check if all inputs is valid ----------------
  const notValidMessage = help.notValid(
    { firstname },
    { lastname },
    { email },
    { password }
  );

  if (notValidMessage) {
    return res.status(400).send({ error: notValidMessage as string });
  }
  // ----------------------------------------------------------------

  // ------------- check if user is already exist or not ------------
  if (await DB.getUserByEmail(email)) {
    return res.status(400).send({ error: help.ERRORS.DUPLICATE_EMAIL });
  }

  // ---------------- hash the new password to store it --------------
  const hashedPassword = await help.hashPassword(password);

  const user: type.User = {
    id: crypto.randomUUID(),
    firstname,
    lastname,
    image_url: "default image for now ",
    email,
    password: hashedPassword,
  };

  // ---------------- save all data in db --------------------------
  await DB.insertUser(user).catch((error) => {
    return next(error);
  });

  // ----------------  create verification token with expire date ----------------
  const jwt = help.createToken({ userId: user.id, verified: false });

  // ---------------- save user data in cache -----------------------------
  const cacheUser: type.UserCacheData = {
    username: user.firstname + " " + user.lastname,
    email: user.email,
    verified: "false",
    plan_token: "free",
    user_token: jwt,
  };

  await cache.cacheUser(user.id, cacheUser).catch((error) => {
    return next(error);
  });

  // ---------------- create random 6-digits code ----------------
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  // ---------------- save verification code in cache ----------------
  await cache.addVerificationCode(user.id, verificationCode).catch((error) => {
    return next(error);
  });

  // ---------------- send verification email to user ----------------
  const fullName = firstname + " " + lastname;
  help.sendEmail(user.email, verificationCode, fullName);

  return res.status(200).send({ jwt });
};
