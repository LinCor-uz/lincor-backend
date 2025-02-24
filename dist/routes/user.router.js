"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)();
exports.userRouter
    .get("/me", middlewares_1.checkAccessToken, controller_1.userController.getMe)
    .post("/profile", middlewares_1.checkAccessToken, middlewares_1.uploadAvatar.single("avatar"), controller_1.userController.profile)
    .get("/all", controller_1.userController.getAll);
