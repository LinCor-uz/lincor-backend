"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _utils_1 = require("@utils");
const SECRET_KEY = (0, _utils_1.getEnvVariable)("SECRET_KEY") || "default_secret_key";
const sign = (payload, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, {
        algorithm: "HS256",
        expiresIn,
    });
    return token;
};
exports.sign = sign;
const verify = (token) => {
    try {
        const decode = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log("DECODED JWT ", decode);
        return { payload: decode, expired: false };
    }
    catch (error) {
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
};
exports.verify = verify;
