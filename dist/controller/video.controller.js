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
exports.videoController = void 0;
const services_1 = require("../services");
exports.videoController = {
    // create video
    createVideo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            req.body.categoryId = Number(req.body.categoryId);
            console.log(req.file);
            const data = Object.assign(Object.assign({}, req.body), { video_path: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
            const result = yield services_1.videoService.createVideo(data);
            res.status(201).send({
                success: true,
                data: result,
            });
        }
        catch (error) {
            const err = error;
            console.log("###ERROR in createVideo ", err.message);
            res
                .status(err.statusCode || 500)
                .send({ success: false, error: err.message });
        }
    }),
    // delete video by id
    deleteVideo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            yield services_1.videoService.deleteVideo(id);
            res
                .status(200)
                .send({ success: true, message: "Video deleted successfully" });
        }
        catch (error) {
            const err = error;
            res
                .status(err.statusCode || 500)
                .send({ success: false, error: err.message });
        }
    }),
    // get all videos
    findAllVideos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield services_1.videoService.getAllVideos();
            res.status(200).send({
                success: true,
                data,
            });
        }
        catch (error) {
            const err = error;
            console.log("#ERROR getAllVideo - ", err.message);
            res
                .status(err.statusCode || 500)
                .send({ success: false, error: err.message });
        }
    }),
    // update video by id
    updateVideo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const id = Number(req.params.id);
            const data = Object.assign(Object.assign({}, req.body), { video_path: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
            const result = yield services_1.videoService.updateVideo(id, data);
            res.status(200).send({ success: true, data: result });
        }
        catch (error) {
            const err = error;
            console.log("#ERROR updateCategory - ", err);
            res
                .status(err.statusCode || 500)
                .send({ success: false, error: err.message });
        }
    }),
};
