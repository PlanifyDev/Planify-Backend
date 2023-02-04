import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../helpers";
import * as help from "../helpers";
import { cache } from "../cache";

export const authByCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const user_id = req.params.id;
  if (!token) {
    return res.status(401).send({ error: ERRORS.BAD_TOKEN });
  }
  const user = await cache.getCachedUser(user_id);
  if (!Object.keys(user).length) {
    return res.status(401).send({ error: ERRORS.USER_NOT_FOUND });
  }

  if (user.user_token !== token) {
    return res.status(401).send({ error: ERRORS.BAD_TOKEN });
  }

  res.locals.userId = user_id;
  res.locals.verified = user.verified;
  return next();
};
