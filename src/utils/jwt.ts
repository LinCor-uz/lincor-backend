import { getEnvVariable } from "../utils";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY: any =
  getEnvVariable("SECRET_KEY") || "default2_secret32_12#23__key";

// expiresIn parametrini string yoki number deb belgilash mumkin.
export const sign = (payload: object, expiresIn: string | number): string => {
  const token = jwt.sign(payload, SECRET_KEY, {
    algorithm: "HS256", // RS256 ishlatish uchun xususiy kalit kerak
    expiresIn: expiresIn,
  });

  return token;
};

export const verify = (
  token: string
): { payload: JwtPayload | null; expired: boolean } => {
  try {
    const decode = jwt.verify(token, SECRET_KEY) as JwtPayload;
    console.log("DECODED JWT ", decode);

    return { payload: decode, expired: false };
  } catch (error: any) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
};
