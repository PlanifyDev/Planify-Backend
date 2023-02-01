import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as handler from "../handlers/userHandler";
import fileUpload from "express-fileupload";
import {
  jwtParseMiddleware,
  checkVerification,
  isSameUser,
} from "../middleware";
export const userRouter = Router();

userRouter.post("/signup", asyncHandler(handler.signUpHandler));
userRouter.get("/verify", asyncHandler(handler.verifyHandler));
userRouter.post("/signin", asyncHandler(handler.signInHandler));
userRouter.put(
  "/updateimg/:id",
  jwtParseMiddleware,
  checkVerification,
  isSameUser,
  fileUpload(),
  asyncHandler(handler.updateImageHandler)
);
userRouter.put(
  "/updateall/:id",
  jwtParseMiddleware,
  checkVerification,
  isSameUser,
  asyncHandler(handler.updateAllHandler)
);
// forgot password endpoint
userRouter.post("/forgetpassword", asyncHandler(handler.forgetPassHandler));
// reset password endpoint
userRouter.post("/resetpassword", asyncHandler(handler.resetPassHandler));

userRouter.delete(
  "/deleteuser/:id",
  jwtParseMiddleware,
  isSameUser,
  asyncHandler(handler.deleteUserHandler)
);
userRouter.use("/sendEmail", jwtParseMiddleware);
userRouter.get("/sendEmail", asyncHandler(handler.sendEmailHandler));
// endpoint to clear database
userRouter.delete("/cleardb", asyncHandler(handler.cleardb));

export default userRouter;
