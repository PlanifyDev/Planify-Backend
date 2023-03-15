import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as handler from "../handlers";
import { authByCache } from "../middleware";
import { loggerMiddleware } from "../middleware";
import { Endpoints } from "../contracts/endPoints";
export const projectRouter = Router();
export const versionRouter = Router();

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

// // ----------------- Create new Project --------------------------
// designRouter.post("/project", authByCache, asyncHandler(handler.createProject));

// // ----------------- Get All Projects --------------------------
// designRouter.get("/project", authByCache, asyncHandler(handler.getProjects));

// // ----------------- Update Project Name --------------------------
// designRouter.put(
//   "/project/:id",
//   authByCache,
//   asyncHandler(handler.updateProjectName)
// );

// // ----------------- Move Project to trash --------------------------
// designRouter.put(
//   "/project/trash/:id",
//   asyncHandler(handler.moveProjectToTrash)
// );

// // ----------------- Restore Project from trash --------------------------
// designRouter.put(
//   "/project/restore/:id",
//   asyncHandler(handler.restoreProjectTrash)
// );

// // ----------------- Delete Project permanently --------------------------
// designRouter.delete("/project/:id", asyncHandler(handler.deleteProject));

// designRouter.use(loggerMiddleware);

// ----------------- Create new Version --------------------------
// designRouter.post("/version", asyncHandler(handler.createVersion));

// ----------------- Get All Versions --------------------------
// designRouter.get("/versions", asyncHandler(handler.getVersions));

// ----------------- Update Version Name --------------------------
// designRouter.put("/version", asyncHandler(handler.updateVersionName));

// ----------------- Move Version to trash --------------------------
// designRouter.put("/version/trash", asyncHandler(handler.moveVersionToTrash));

// ----------------- Restore Version from trash --------------------------
// designRouter.put("/version/restore", asyncHandler(handler.restoreVersionTrash));

// ----------------- Delete Version permanently --------------------------
// designRouter.delete("/version", asyncHandler(handler.deleteVersion));
