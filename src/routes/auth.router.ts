import { authController } from "@controllers";
import {
  checkAccessToken,
  uploadAvatar,
  verifyRefreshToken,
} from "@middlewares";
import { Router } from "express";

export const authRouter = Router();

authRouter
  .post("/register", uploadAvatar.single("avatar"), authController.register)
  .post("/login", authController.login)
  .post("/logout", checkAccessToken, authController.logout)
  .post("/token", verifyRefreshToken, authController.refreshToken);
