import { Router } from "express";
import asyncHandler from "express-async-handler";
import * as handler from "../handlers/userHandler";
import { jwtParseMiddleware, isSameUser } from "../middleware";
export const userRouter = Router();

userRouter.post("/signup", asyncHandler(handler.signUpHandler));
userRouter.post("/signin", asyncHandler(handler.signInHandler));

userRouter.use(jwtParseMiddleware);

userRouter.put(
  "/updatepass/:id",
  isSameUser,
  asyncHandler(handler.updatePasswordHandler)
);
userRouter.put(
  "/updatename/:id",
  isSameUser,
  asyncHandler(handler.updateNameHandler)
);
userRouter.put(
  "/updateimg/:id",
  isSameUser,
  asyncHandler(handler.updateImageHandler)
);
userRouter.put(
  "/updateall/:id",
  isSameUser,
  asyncHandler(handler.updateAllHandler)
);
userRouter.delete(
  "/deleteuser/:id",
  isSameUser,
  asyncHandler(handler.deleteUserHandler)
);

export default userRouter;
