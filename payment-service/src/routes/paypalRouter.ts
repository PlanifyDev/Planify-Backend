import { Router } from "express";
import asyncHandler from "express-async-handler";

import * as paypalHandler from "../handlers/paypalHandler";

export const paypalRouter = Router();

paypalRouter.post("/pay", asyncHandler(paypalHandler.pay));

export default paypalRouter;
