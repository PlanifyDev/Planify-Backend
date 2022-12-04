import crypto from "crypto";
import { DB } from "../datastore";
import {
  myHandler,
  myHandlerWithParam,
  User,
  UserNewData,
  UserDB,
} from "../contracts/types";
import * as api from "../contracts/api";
import {
  ERRORS,
  hashPassword,
  comparePassword,
  createToken,
  sendEmail,
} from "../helpers";

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

  // TO-DO
  // >> validation on all fields

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

  const jwt = createToken({ userId: user.id, verified: false });

  // send verification email to user
  const fullName = firstname + " " + lastname;
  sendEmail(user.email, jwt, fullName);

  return res.status(200).send({ jwt });
};

export const signInHandler: myHandler<api.SignInReq, api.SigninRes> = async (
  req,
  res,
  next
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).send({ error: ERRORS.WRONG_LOGIN });
  }
  let existing: UserDB;
  try {
    existing = await DB.getUserByEmail(email);
  } catch (error) {
    return next(error);
  }
  const isMatch = await comparePassword(password, existing.password);
  if (!existing || !isMatch) {
    return res.status(403).send({ error: ERRORS.WRONG_LOGIN });
  }

  const user = {
    id: existing.id,
    email: existing.email,
    firstname: existing.firstname,
    lastname: existing.lastname,
    image_url: existing.image_url,
    verified: existing.verified,
  };
  const jwt = createToken({ userId: existing.id, verified: existing.verified });
  return res.status(200).send({ user, jwt });
};

export const updatePasswordHandler: myHandlerWithParam<
  api.UpdatePassParam,
  api.UpdatePassReq,
  never
> = async (req, res, next) => {
  const userId = res.locals.userId;
  const newPassword = await hashPassword(req.body.password);

  await DB.updatePassword(userId, newPassword).catch((err) => {
    return next(err);
  });
  return res.sendStatus(200);
};

export const updateNameHandler: myHandlerWithParam<
  api.UpdateNameParam,
  api.UpdateNameReq,
  never
> = async (req, res, next) => {
  const userId = res.locals.userId;
  const { firstname, lastname } = req.body;
  await DB.updateName(userId, firstname, lastname).catch((err) => {
    return next(err);
  });
  return res.sendStatus(200);
};

export const updateImageHandler: myHandlerWithParam<
  api.UpdateImgParam,
  api.UpdateImgReq,
  never
> = async (req, res, next) => {
  const userId = res.locals.userId;
  const { image_url } = req.body;

  await DB.updateImg(userId, image_url).catch((err) => {
    return next(err);
  });
  return res.sendStatus(200);
};

export const updateAllHandler: myHandlerWithParam<
  api.UpdateAllParam,
  api.UpdateAllReq,
  never
> = async (req, res, next) => {
  let user: UserDB;
  try {
    user = await DB.getUserById(res.locals.userId);
  } catch (error) {
    return next(error);
  }

  const firstname = req.body.firstname || user.firstname;
  const lastname = req.body.lastname || user.lastname;
  const image_url = req.body.image_url || user.image_url;
  let password = user.password;
  if (req.body.password) {
    password = await hashPassword(req.body.password);
  }
  const newUser: UserNewData = { firstname, lastname, image_url, password };
  await DB.updateAllData(user.id, newUser).catch((error) => {
    return next(error);
  });
  return res.sendStatus(200);
};

export const deleteUserHandler: myHandlerWithParam<
  api.DeleteUserParam,
  never,
  never
> = async (req, res, next) => {
  const userId = res.locals.userId;

  await DB.deleteUser(userId).catch((err) => {
    return next(err);
  });
  return res.sendStatus(200);
};
