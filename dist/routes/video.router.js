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
    .get("/:filename", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller_1.videoController.getVideo(req, res);
    }
    catch (error) {
        next(error);
    }
}));
