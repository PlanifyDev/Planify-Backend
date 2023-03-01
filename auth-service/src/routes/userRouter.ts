import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as handler from "../handlers/userHandler";
import fileUpload from "express-fileupload";
import * as middleware from "../middleware";
import { authByCache } from "../middleware/authByCache";
export const userRouter = Router();

userRouter.post("/signup", asyncHandler(handler.signUpHandler));

userRouter.put(
  "/verify/:id",
  middleware.authByCache,
  asyncHandler(handler.verifyHandler)
);

userRouter.post("/signin", asyncHandler(handler.signInHandler));
userRouter.get("/signout/:id", asyncHandler(handler.signOutHandler));

userRouter.put(
  "/update-img/:id",
  middleware.authByCache,
  middleware.checkVerification,
  fileUpload(),
  asyncHandler(handler.updateImageHandler)
);

userRouter.put(
  "/update-all/:id",
  middleware.authByCache,
  middleware.checkVerification,
  asyncHandler(handler.updateAllHandler)
);

// forgot password endpoint
userRouter.post("/forget-password", asyncHandler(handler.forgetPassHandler));

// reset password endpoint
userRouter.post("/reset-password", asyncHandler(handler.resetPassHandler));

userRouter.delete(
  "/delete-user/:id",
  middleware.authByCache,
  asyncHandler(handler.deleteUserHandler)
);

userRouter.get(
  "/resend-verification/:id",
  authByCache,
  asyncHandler(handler.resendVerificationHandler)
);

// endpoint to get data of user
userRouter.get("/get-user/:id", asyncHandler(handler.getUserHandler));

// endpoint to clear database
userRouter.delete("/cleardb", asyncHandler(handler.cleardb));

export default userRouter;
