import { Router } from "express";
import asyncHandler from "express-async-handler";
import { signUpHandler } from "../handlers/userHandler";
export const userRouter = Router();

userRouter.post("/signup", asyncHandler(signUpHandler));

// userRouter.post("/signin", asyncHandler());

export default userRouter;
