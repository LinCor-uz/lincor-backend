"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const utils_1 = require("../utils");
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
const sessionMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = (0, utils_1.verify)(token);
        let storedToken = null;
        if (decoded.payload) {
            const userId = decoded.payload.id;
            storedToken = yield redis.get(`user:${userId}`);
            console.log(storedToken);
        }
        else {
            console.log("Token yaroqsiz yoki muddati tugagan.");
            return res.status(401).send({ message: "Unauthorized" });
        }
        if (storedToken !== token) {
            return res.status(401).send({ success: false, message: "Unauthorized" });
        }
        req.user = decoded.payload;
        next();
    }
    catch (error) {
        return res.status(401).send({ message: "Unauthorized" });
    }
});
exports.sessionMiddleware = sessionMiddleware;
