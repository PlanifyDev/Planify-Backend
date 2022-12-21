import { ErrorRequestHandler } from "express";
import { NewError } from "../helpers";
export const errHandler: ErrorRequestHandler = (err, _, res, __) => {
  console.error("Uncaught exception:", err.message);
  if (err instanceof NewError) {
    return res.status(err.statusCode).send({ error: err.message });
  }
  return res
    .status(500)
    .send({ error: "Oops, an unexpected error occurred, please try again" });
};
