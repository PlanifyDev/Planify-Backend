import crypto from "crypto";
import { DB } from "../datastore";
import {
  myHandler,
  myHandlerWithParam,
  User,
  UserNewData,
  UserDB,
  JwtPayload,
} from "../contracts/types";
import * as api from "../contracts/api";
import {
  ERRORS,
  hashPassword,
  comparePassword,
  createToken,
  sendEmail,
  verifyToken,
  signInValidator,
  signUpValidator,
} from "../helpers";
import AWS from "aws-sdk";
import accessEnv from "../helpers/accessEnv";

export const signUpHandler: myHandler<api.SignUpReq, api.SignupRes> = async (
  req,
  res,
  next
) => {
  const { firstname, lastname, email, password } = req.body;

  const notValidMessage = signUpValidator(firstname, lastname, email, password);

  if (notValidMessage) {
    return res.status(403).send({ error: notValidMessage as string });
  }

  if (await DB.getUserByEmail(email)) {
    return res.status(403).send({ error: ERRORS.DUPLICATE_EMAIL });
  }

  const hashedPassword = await hashPassword(password);
  const user: User = {
    id: crypto.randomUUID(),
    firstname,
    lastname,
    image_url: "default image for now ",
    email,
    password: hashedPassword,
  };

  await DB.insertUser(user).catch((error) => {
    return next(error);
  });

  // create verification token with expire date
  const jwt = createToken({ userId: user.id, verified: false }, "1d");

  // send verification email to user
  const fullName = firstname + " " + lastname;
  sendEmail(user.email, jwt, fullName);

  return res.status(200).send({ jwt });
};

export const sendEmailHandler: myHandler<never, api.SendEmail> = async (
  _,
  res
) => {
  const userId = res.locals.userId;
  const user = await DB.getUserById(userId);

  // create verification token with expire date
  const jwt = createToken({ userId: user.id, verified: false }, "1d");

  // send verification email to user
  const fullName = user.firstname + " " + user.lastname;
  sendEmail(user.email, jwt, fullName);

  return res.status(200);
};

export const verifyHandler: myHandler<never, api.Verify> = async (req, res) => {
  const token = req.query.key as string;
  if (!token) {
    return res.status(401).send({ error: ERRORS.BAD_VERIFY_RUL });
  }

  let payload: JwtPayload;

  try {
    payload = verifyToken(token);
  } catch (error) {
    return res.status(401).send({ error: ERRORS.BAD_VERIFY_RUL });
  }

  const user = await DB.getUserById(payload.userId);
  if (!user) {
    return res.status(401).send({ error: ERRORS.BAD_VERIFY_RUL });
  }

  await DB.updateVerification(payload.userId);
  return res.status(200).redirect("http://52.91.28.172:3000/test");
};

export const signInHandler: myHandler<api.SignInReq, api.SigninRes> = async (
  req,
  res,
  next
) => {
  const { email, password } = req.body;

  const notValidMessage = signInValidator(email, password);
  if (notValidMessage) {
    return res.status(403).send({ error: notValidMessage as string });
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
  api.UpdateImgRes
> = async (req, res, next) => {
  const userId = res.locals.userId;
  AWS.config.update({
    accessKeyId: accessEnv("AWS_ACCESS_KEY"),
    secretAccessKey: accessEnv("AWS_SECRET_KEY"),
    region: "us-east-1",
  });

  const s3 = new AWS.S3();

  const fileContent = Buffer.from(req.files.img["data"], "binary");

  const params = {
    Bucket: accessEnv("AWS_S3_BUCKET_NAME"),
    Key: userId,
    Body: fileContent,
    ContentType: req.files.img["mimetype"],
    ACL: "public-read",
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    console.log(data);
    return res.status(200).send({ image_url: data.Location });
  });
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

export const cleardb: myHandler<never, never> = async (req, res, next) => {
  await DB.clearUsers()
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      return next(err);
    });
};
