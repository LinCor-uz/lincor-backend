"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVariable = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnvVariable = (key) => {
    const value = process.env[key];
    if (value === undefined) {
        console.log(`Xato: ${key} muhit o'zgaruvchisi topilmadi`);
        return null;
    }
    return value;
};
exports.getEnvVariable = getEnvVariable;
