import jwt from "jsonwebtoken";
import { getEnvVariable } from "@utils";

const SECRET_KEY: string | null =
  getEnvVariable("SECRET_KEY") || "default_secret_key";

export const sign = (payload: any, expiresIn: string | number) => {
  console.log("Payload of jwt", payload);
  console.log("Secret key of jwt", SECRET_KEY);

  return jwt.sign(payload, SECRET_KEY, { algorithm: "RS256", expiresIn });
};

export const verify = (token: string) => {
  try {
    let decode = jwt.verify(token, SECRET_KEY);
    return { payload: decode, expired: false };
  } catch (error: any) {
    return { payload: null, expired: error.message.include("jwt expired") };
  }
};
