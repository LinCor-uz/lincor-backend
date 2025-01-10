import { getEnvVariable } from "@utils";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Access token is missing",
    });

    try {
      const decode = jwt.verify(token, getEnvVariable("ACCESS_TOKEN_SECRET")!);
      req.user = decode;

      next();
    } catch (error) {
      return res.status(401).send({
        success: false,
        message: "Invalid or expired access token",
      });
    }
  }
};
