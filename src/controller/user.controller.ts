import { NextFunction, Request, Response } from "express";
import { userService } from "@services";
import { prisma } from "@config";
import { sendError } from "@utils";

export const userController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.registerUser(req.body);

      res.status(201).send({
        success: true,
        data: user,
      });
    } catch (error: unknown) {
      const err = error as sendError;
      console.log("###ERROR in create USER-  ", err.message);
      res
        .status(err.statusCode || 500)
        .send({ success: false, error: err.message });
    }
  },
};
