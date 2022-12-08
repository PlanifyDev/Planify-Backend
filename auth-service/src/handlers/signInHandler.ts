import { DB } from "../datastore";
import { myHandler, UserDB } from "../contracts/types";
import { SignInReq, SigninRes } from "../contracts/api";
import * as help from "../helpers";

export const signInHandler: myHandler<SignInReq, SigninRes> = async (
  req,
  res,
  next
) => {
  const { email, password } = req.body;

  const notValidMessage = help.notValid({ email }, { password });
  if (notValidMessage) {
    return res.status(403).send({ error: notValidMessage as string });
  }

  let existing: UserDB;
  try {
    existing = await DB.getUserByEmail(email);
  } catch (error) {
    return next(error);
  }

  if (!existing) {
    return res.status(403).send({ error: help.ERRORS.WRONG_LOGIN });
  }

  const isMatch = await help.comparePassword(password, existing.password);
  if (!existing || !isMatch) {
    return res.status(403).send({ error: help.ERRORS.WRONG_LOGIN });
  }

  const user = {
    id: existing.id,
    email: existing.email,
    firstname: existing.firstname,
    lastname: existing.lastname,
    image_url: existing.image_url,
    verified: existing.verified,
  };
  const jwt = help.createToken({
    userId: existing.id,
    verified: existing.verified,
  });
  return res.status(200).send({ user, jwt });
};
