import { userController } from "@controllers";
import { checkAccessToken, uploadAvatar } from "@middlewares";
import { Router } from "express";

export const userRouter = Router();

userRouter
  .get("/me", checkAccessToken, userController.getMe)
  .post(
    "/profile",
    checkAccessToken,
    uploadAvatar.single("avatar"),
    userController.profile
  );
