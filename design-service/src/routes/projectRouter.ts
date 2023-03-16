import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as handler from "../handlers";
import { authByCache } from "../middleware";
import { loggerMiddleware } from "../middleware";
import { Endpoints } from "../contracts/endPoints";
export const projectRouter = Router();

Object.keys(Endpoints).forEach((key) => {
  const { method, url, handler: handlerName, auth } = Endpoints[key];
  const handlerFunc = handler[handlerName];
  if (auth) {
    projectRouter[method](
      url,
      authByCache,
      asyncHandler(handlerFunc),
      loggerMiddleware
    );
  } else {
    projectRouter[method](url, asyncHandler(handlerFunc), loggerMiddleware);
  }
});
