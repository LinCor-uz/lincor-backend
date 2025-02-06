import jwt, { JwtPayload } from "jsonwebtoken";
import { getEnvVariable } from "../utils";

const SECRET_KEY: string = getEnvVariable("SECRET_KEY") || "default_secret_key";

export const sign = (payload: any, expiresIn: string | number) => {
  const token = jwt.sign(payload, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn,
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
