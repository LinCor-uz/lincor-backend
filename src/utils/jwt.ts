import jwt from "jsonwebtoken"
import {getEnvVariable} from "@utils";

const SECRET_KEY: string | null = getEnvVariable("SECRET_KEY") || "default_secret_key"

export const sign = (payload: string) => {

    console.log("Payload of jwt", payload)
    console.log("Secret key of jwt", SECRET_KEY)

    return jwt.sign(payload, SECRET_KEY)
}

export const verify = (token: string) => {
    return jwt.verify(token, SECRET_KEY)
}

