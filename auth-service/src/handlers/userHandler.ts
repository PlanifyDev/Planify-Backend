import crypto from "crypto";
import { DB } from "../datastore";
import { myHandler, myHandlerWithParam } from "../contracts/types";
import * as api from "../contracts/api";
import { User } from "./../contracts/types";
import { ERRORS, hashPassword, comparePassword, createToken } from "../helpers";

export const signUpHandler: myHandler<api.SignUpReq, api.SignupRes> = async (
  req,
  res,
  next
) => {
  const { firstname, lastname, image_url, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).send({ error: ERRORS.USER_REQUIRED_FIELDS });
  }

  if (await DB.getUserByEmail(email)) {
    return res.status(403).send({ error: ERRORS.DUPLICATE_EMAIL });
  }

  const hashedPassword = await hashPassword(password);
  const user: User = {
    id: crypto.randomUUID(),
    firstname,
    lastname,
    image_url,
    email,
    password: hashedPassword,
  };

  await DB.insertUser(user).catch((error) => {
    return next(error);
  });

  const jwt = createToken({ userId: user.id });
  return res.status(200).send({ jwt });
};
