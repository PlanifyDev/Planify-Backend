import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as planHandler from "../handlers/planHandler";

export const planRouter = Router();

planRouter.get("/", asyncHandler(planHandler.getAllPlans));

planRouter.get("/:plan_id", asyncHandler(planHandler.getPlan));

export default planRouter;
