import { User } from "@validations";
import { getEnvVariable } from "./dotenv";
import { sign } from "./jwt";
import { prisma } from "@config";
import jwt from "jsonwebtoken";
import { verify } from "@utils";
import errorMap from "zod/lib/locales/en";

export const generateAccessToken = (user: User) => {
  const payload = {
    phone: user?.phone,
    id: user?.id,
  };
  return sign(payload, getEnvVariable("ACCESS_TOKEN_LIFE")!);
};

export const generateRefreshToken = async (user: User) => {
  const payload = {
    phone: user?.phone,
    id: user?.id,
  };
  const refreshToken = sign(payload, getEnvVariable("REFRESH_TOKEN_LIFE")!);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });
  return refreshToken;
};

export const verifyToken = (token: string, secretKey: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { payload: decoded, expired: false };
  } catch (error: any) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
};
