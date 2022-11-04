import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as handler from "../handlers/userHandler";
export const userRouter = Router();

userRouter.post("/signup", asyncHandler(handler.signUpHandler));

userRouter.post("/signin", asyncHandler(handler.signInHandler));

export default userRouter;
