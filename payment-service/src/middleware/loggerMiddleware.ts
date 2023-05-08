import { ErrorRequestHandler } from "express";
import { NewError, logger } from "../helpers";

export const loggerMiddleware: ErrorRequestHandler = (error, req, res, _) => {
  const { statusMessage } = res;
  const { method, originalUrl, body, ip } = req;
  const statusCode = error.statusCode || 500;

  if (error instanceof NewError) {
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
