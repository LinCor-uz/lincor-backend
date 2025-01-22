import { getEnvVariable, verify } from "../utils";
import { NextFunction, Request, Response } from "express";
import Redis from "ioredis";

const redis = new Redis();

export const sessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = verify(token);

    let storedToken: string | null = null;
    if (decoded.payload) {
      const userId = decoded.payload.id;
      storedToken = await redis.get(`user:${userId}`);
      console.log(storedToken);
    } else {
      console.log("Token yaroqsiz yoki muddati tugagan.");
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (storedToken !== token) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }

    req.user = decoded.payload;

    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
