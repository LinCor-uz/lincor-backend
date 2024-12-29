import { getEnvVariable, sendError } from "@utils";
import jwt from "jsonwebtoken";

export const createAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, getEnvVariable("ACCESS_TOKEN_SECRET")!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, getEnvVariable("REFRESH_TOKEN_SECRET")!, {
    expiresIn: "14d",
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, getEnvVariable("REFRESH_TOKEN_SECRET")!);
  } catch (error) {
    throw new sendError("Invalid refresh token", 401);
  }
};
