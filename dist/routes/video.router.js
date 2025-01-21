"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const _controllers_1 = require("@controllers");
const _middlewares_1 = require("@middlewares");
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter
    .post("/", _middlewares_1.uploadVideo.single("video"), _controllers_1.videoController.createVideo)
    .delete("/:id", _middlewares_1.isValidId, _controllers_1.videoController.deleteVideo)
    .get("/", _controllers_1.videoController.findAllVideos)
    .put("/:id", _middlewares_1.isValidId, _middlewares_1.uploadVideo.single("video"), _controllers_1.videoController.updateVideo);
