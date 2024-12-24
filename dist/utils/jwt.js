"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _utils_1 = require("@utils");
const SECRET_KEY = (0, _utils_1.getEnvVariable)("SECRET_KEY") || "default_secret_key";
const sign = (payload) => {
    console.log("Payload of jwt", payload);
    console.log("Secret key of jwt", SECRET_KEY);
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY);
};
exports.sign = sign;
const verify = (token) => {
    return jsonwebtoken_1.default.verify(token, SECRET_KEY);
};
exports.verify = verify;
