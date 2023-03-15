import { RequestHandler } from "express";
import { logger } from "../helpers";

export const notFound: RequestHandler = (req, res) => {
  const { method, path, body, ip } = req;
  logger.req(
    "not found",
    { method, path, body, ip },
    { statusCode: 404, message: "page not found" }
  );
  res.status(404).send(`Oops! page not found`);
};
