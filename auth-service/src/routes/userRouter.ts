import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as handler from "../handlers/userHandler";
import { jwtParseMiddleware, isSameUser } from "../middleware";
export const userRouter = Router();

userRouter.post("/signup", asyncHandler(handler.signUpHandler));
userRouter.get("/verify", asyncHandler(handler.verifyHandler));
userRouter.post("/signin", asyncHandler(handler.signInHandler));

userRouter.put(
  "/updatepass/:id",
  jwtParseMiddleware,
  isSameUser,
  asyncHandler(handler.updatePasswordHandler)
);
userRouter.put(
  "/updatename/:id",
  jwtParseMiddleware,
  isSameUser,
  asyncHandler(handler.updateNameHandler)
);
userRouter.put(
  "/updateimg/:id",
  jwtParseMiddleware,
  isSameUser,
  asyncHandler(handler.updateImageHandler)
);
userRouter.put(
  "/updateall/:id",
  jwtParseMiddleware,
  isSameUser,
  asyncHandler(handler.updateAllHandler)
);
userRouter.delete(
  "/deleteuser/:id",
  jwtParseMiddleware,
  isSameUser,
  asyncHandler(handler.deleteUserHandler)
);

export default userRouter;
