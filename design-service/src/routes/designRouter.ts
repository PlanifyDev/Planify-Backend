import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as handler from "../handlers";
import { authByCache } from "../middleware";
export const designRouter = Router();

// ----------------- Create new Project --------------------------
designRouter.post("/project", authByCache, asyncHandler(handler.createProject));

// // ----------------- Create new Version --------------------------
// // designRouter.post("/version", asyncHandler(handler.createVersion));

// // ----------------- Get All Projects --------------------------
// // designRouter.get("/projects", asyncHandler(handler.getProjects));

// // ----------------- Get All Versions --------------------------
// designRouter.get("/versions", asyncHandler(handler.getVersions));

// // ----------------- Update Project Name --------------------------
// designRouter.put("/project", asyncHandler(handler.updateProjectName));

// // ----------------- Update Version Name --------------------------
// designRouter.put("/version", asyncHandler(handler.updateVersionName));

// // ----------------- Move Project to trash --------------------------
// designRouter.put("/project/trash", asyncHandler(handler.moveProjectToTrash));

// // ----------------- Move Version to trash --------------------------
// designRouter.put("/version/trash", asyncHandler(handler.moveVersionToTrash));

// // ----------------- Restore Project from trash --------------------------
// designRouter.put("/project/restore", asyncHandler(handler.restoreProjectTrash));

// // ----------------- Restore Version from trash --------------------------
// designRouter.put("/version/restore", asyncHandler(handler.restoreVersionTrash));

// // ----------------- Delete Project permanently --------------------------
// designRouter.delete("/project", asyncHandler(handler.deleteProject));

// // ----------------- Delete Version permanently --------------------------
// designRouter.delete("/version", asyncHandler(handler.deleteVersion));
