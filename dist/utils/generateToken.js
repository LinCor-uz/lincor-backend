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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const dotenv_1 = require("./dotenv");
const _config_1 = require("@config");
const jwt_1 = require("./jwt");
const generateAccessToken = (user) => {
    const payload = {
        phone: user.phone,
        id: user.id,
    };
    return (0, jwt_1.sign)(payload, (0, dotenv_1.getEnvVariable)("ACCESS_TOKEN_LIFE"));
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        phone: user === null || user === void 0 ? void 0 : user.phone,
        id: user === null || user === void 0 ? void 0 : user.id,
    };
    const refreshToken = (0, jwt_1.sign)(payload, (0, dotenv_1.getEnvVariable)("REFRESH_TOKEN_LIFE"));
    yield _config_1.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });
    // console.log("REFRESH TOKEN GENRATOR ###", refreshToken);
    return refreshToken;
});
exports.generateRefreshToken = generateRefreshToken;
