"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const express_1 = require("express");
exports.authRouter = (0, express_1.Router)();
exports.authRouter
    .post("/register", middlewares_1.uploadAvatar.single("avatar"), controller_1.authController.register)
    .post("/login", controller_1.authController.login)
    .post("/logout", middlewares_1.checkAccessToken, controller_1.authController.logout)
    .post("/token", middlewares_1.verifyRefreshToken, controller_1.authController.refreshToken)
    .get("/test", middlewares_1.sessionMiddleware, (req, res) => {
    res.send("Test route");
});
