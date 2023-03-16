import { ErrorRequestHandler } from "express";
import { MyError, logger } from "../helpers";

export const loggerMiddleware: ErrorRequestHandler = (error, req, res, _) => {
  const { statusCode, statusMessage } = res;
  const { method, originalUrl, body, ip } = req;

  if (error instanceof MyError) {
    logger.error(error.message, error.errorObj);
    logger.req(
      "Server Error",
      { method, path: originalUrl, body, ip },
      { statusCode: 500, message: error.message }
    );
    return res
      .status(500)
      .send({ error: "Oops, an unexpected error occurred, please try again" });
  } else {
    return logger.req(
      statusMessage,
      { method, path: originalUrl, body, ip },
      { statusCode, message: error }
    );
  }
};
