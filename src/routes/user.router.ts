import { userController } from "@controllers";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/", userController.createUser);
