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
exports.authController = void 0;
const _config_1 = require("@config");
const _services_1 = require("@services");
const _utils_1 = require("@utils");
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
exports.authController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const date = req.body;
            let { refreshToken, accessToken, user } = yield _services_1.authService.login(date);
            res.cookie("refreshToken", refreshToken, { httpOnly: true });
            yield redis.set(`user:${user.id}`, accessToken);
            res.send({ accessToken });
        }
        catch (error) {
            const err = error;
            console.log("#ERROR userLogin - ", err);
            res.status(500).send({ success: false, error: err.message });
        }
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let data = Object.assign(Object.assign({}, req.body), { refreshToken: null });
            let newUser = yield _services_1.authService.register(data, req.file);
            console.log(newUser);
            const accessToken = (0, _utils_1.generateAccessToken)({
                id: newUser.id,
                phone: newUser.phone,
            });
            const refreshToken = yield (0, _utils_1.generateRefreshToken)(newUser);
            res.cookie("accessToken", accessToken, { httpOnly: false });
            res.cookie("refreshToken", refreshToken, { httpOnly: false });
            res.status(201).send({
                success: true,
                newUser,
                accessToken,
                refreshToken,
            });
        }
        catch (error) {
            const err = error;
            console.log("#ERROR userRegister - ", err);
            res.status(500).send({ success: false, error: err.message });
        }
    }),
    refreshToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { refreshToken } = req.cookies;
        // Check the refresh token in cookies
        if (!refreshToken) {
            res.status(403).json({
                success: false,
                message: "Invalid or expired token",
            });
            return;
        }
        try {
            // Verify if the refresh token exists in the database
            const user = yield _config_1.prisma.user.findFirst({ where: { refreshToken } });
            if (!user) {
                res.status(403).json({
                    success: false,
                    message: "Invalid or expired refresh token",
                });
                return;
            }
            const { payload, expired } = (0, _utils_1.verify)(refreshToken);
            if (expired || !payload) {
                res.status(401).json({
                    success: false,
                    message: "Invalid or expired refresh token",
                });
                return;
            }
            const accessToken = (0, _utils_1.generateAccessToken)(user);
            res.status(200).json({
                success: true,
                token: accessToken,
            });
        }
        catch (error) {
            console.error("Error handling refresh token:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }),
    logout: (res, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.cookies;
            if (refreshToken) {
                const user = yield _config_1.prisma.user.findFirst({ where: { refreshToken } });
                if (user) {
                    yield _config_1.prisma.user.update({
                        where: { id: user.id },
                        data: { refreshToken: " " },
                    });
                }
            }
            res.clearCookie("refreshToken");
            res.status(200).send({ success: true, message: "Successfuly logout" });
        }
        catch (error) {
            const err = error;
            console.log("#ERROR logOut - ", err);
            res.status(500).send({ success: false, error: err.message });
        }
    }),
};
