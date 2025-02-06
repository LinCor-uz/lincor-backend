import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { getEnvVariable } from "../utils";

const SECRET_KEY: any =
  getEnvVariable("SECRET_KEY") || "default2_secret32_12#23__key";

export const sign = (payload: object, expiresIn: string | number) => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn,
  };

  return jwt.sign(payload, SECRET_KEY, options);
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
