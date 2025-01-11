import { authController } from "@controllers";
import { Router } from "express";

export const authRouter = Router();

authRouter
  .post("/register", authController.register)
  .post("/login", authController.login)
  .post("/logout", authController.logout)
  .post("/token", authController.refreshToken);
