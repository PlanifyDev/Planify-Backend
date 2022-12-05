import { ERRORS, verifyToken } from "../helpers";
import { DB } from "../datastore";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../contracts/types";

export const jwtParseMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ error: ERRORS.BAD_TOKEN });
  }

  let payload: JwtPayload;

  try {
    payload = verifyToken(token);
  } catch (error) {
    return res.status(401).send({ error: ERRORS[error.message] });
  }

  const user = await DB.getUserById(payload.userId);
  if (!user) {
    return res.status(401).send({ error: ERRORS.USER_NOT_FOUND });
  }

  res.locals.userId = user.id;
  res.locals.verified = user.verified;
  return next();
};

export const checkVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.verified != true) {
    return res.status(401).send({ error: ERRORS.NOT_VERIFIED });
  }

  return next();
};

export const isSameUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.userId) {
    return res.sendStatus(401);
  }
  if (res.locals.userId !== req.params.id) {
    return res.status(401).send({ error: ERRORS.NOT_AUTHORIZED });
  }

  return next();
};
