"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const _controllers_1 = require("@controllers");
const _middlewares_1 = require("@middlewares");
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)();
exports.userRouter
    .get("/me", _middlewares_1.checkAccessToken, _controllers_1.userController.getMe)
    .post("/profile", _middlewares_1.checkAccessToken, _middlewares_1.uploadAvatar.single("avatar"), _controllers_1.userController.profile);
