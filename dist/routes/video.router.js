"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter
    .post("/", middlewares_1.uploadVideo.single("video"), controller_1.videoController.createVideo)
    .delete("/:id", middlewares_1.isValidId, controller_1.videoController.deleteVideo)
    .get("/", controller_1.videoController.findAllVideos)
    .put("/:id", middlewares_1.isValidId, middlewares_1.uploadVideo.single("video"), controller_1.videoController.updateVideo)
    .get("/:filename", controller_1.videoController.getVideo);
