import { Router } from "express";
import asyncHandler from "express-async-handler";
import { auth } from "../middleware";
import * as paypalHandler from "../handlers/paypalHandler";

export const paypalRouter = Router();

paypalRouter.post("/pay", auth, asyncHandler(paypalHandler.pay));

export default paypalRouter;
