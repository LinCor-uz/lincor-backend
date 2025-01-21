"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const _controllers_1 = require("@controllers");
const _middlewares_1 = require("@middlewares");
const express_1 = require("express");
exports.authRouter = (0, express_1.Router)();
exports.authRouter
    .post("/register", _middlewares_1.uploadAvatar.single("avatar"), _controllers_1.authController.register)
    .post("/login", _controllers_1.authController.login)
    .post("/logout", _middlewares_1.checkAccessToken, _controllers_1.authController.logout)
    .post("/token", _middlewares_1.verifyRefreshToken, _controllers_1.authController.refreshToken)
    .get("/test", _middlewares_1.sessionMiddleware, (req, res) => {
    res.send("Test route");
});
