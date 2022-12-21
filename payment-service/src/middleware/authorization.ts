import { Request, Response, NextFunction } from "express";
import { authorization } from "../gRPC/auth_client/authClient";
import { ERRORS, NewError } from "../helpers";
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const jwt = req.headers.authorization;
  if (!jwt) {
    return res.status(401).send({ error: ERRORS.BAD_TOKEN });
  }

  authorization(jwt)
    .then((user_id) => {
      res.locals.user_id = user_id;
      return next();
    })
    .catch((err) => {
      let error: NewError;
      if (err.code == 2) {
        error = new NewError(err.details, 401);
        return next(error);
        // throw new NewError(err.details, 401);
      } else {
        // rpc server error
        return next(new Error("gRPC server error"));
        // throw new NewError(err.details, 500);
      }
    });
};
