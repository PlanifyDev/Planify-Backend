import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as handler from "../handlers";
import { authByCache } from "../middleware";
import { loggerMiddleware } from "../middleware";
import { VersionsEndpoints } from "../contracts/endPoints";
export const versionRouter = Router();

Object.keys(VersionsEndpoints).forEach((key) => {
  const { method, url, handler: handlerName, auth } = VersionsEndpoints[key];
  const handlerFunc = handler[handlerName];
  if (auth) {
    versionRouter[method](
      url,
      authByCache,
      asyncHandler(handlerFunc),
      loggerMiddleware
    );
  } else {
    versionRouter[method](url, asyncHandler(handlerFunc), loggerMiddleware);
  }
});
