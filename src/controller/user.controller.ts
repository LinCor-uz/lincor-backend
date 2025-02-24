import { userService } from "../services";
import { sendError } from "../utils";
import { Request, Response } from "express";

export const userController = {
  getMe: async (req: Request, res: Response) => {
    try {
      const data = { ...req.user };
      const user = await userService.getMe(data);

      res.send({
        success: true,
        data: user,
      });
    } catch (error: unknown) {
      const err = error as sendError;
      console.log("###ERROR in create USER- ", err.message);
      res
        .status(err.statusCode || 500)
        .send({ success: false, error: err.message });
    }
  },

  profile: async (req: Request, res: Response) => {
    try {
      const userInfo = await userService.editProfile(req.body, req.user);

      res.status(200).send({
        success: true,
        userInfo,
      });
    } catch (error: unknown) {
      const err = error as sendError;
      console.log("#ERROR updateUserInfo - ", err);
      res
        .status(err.statusCode || 500)
        .send({ success: false, error: err.message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUser();

      res.status(200).send({
        success: true,
        data: users,
      });
    } catch (error: unknown) {
      const err = error as sendError;
      console.log("###ERROR in create USER- ", err.message);
      res
        .status(err.statusCode || 500)
        .send({ success: false, error: err.message });
    }
  },
};
