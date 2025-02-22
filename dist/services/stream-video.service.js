"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playVideo = void 0;
const console_1 = require("console");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const videoDir = path_1.default.join(__dirname, "../../uploads/video");
if (!videoDir) {
    (0, console_1.log)("Creating video directory not found");
}
const playVideo = (filename, renge, res) => {
    const videoPath = path_1.default.join(videoDir, filename);
    if (fs_1.default.existsSync(videoPath)) {
        new utils_1.sendError("Video not found", 404);
        return;
    }
    const stat = fs_1.default.statSync(videoPath);
    const fileSize = stat.size;
    const chunkSize = 1024 * 1024; // 1mb chunk size
    if (renge) {
        const parts = renge.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = Math.min(start + chunkSize, fileSize - 1);
        const file = fs_1.default.createReadStream(videoPath, { start, end });
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": end - start + 1,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, head);
        file.pipe(res);
    }
    else {
        const head = {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(200, head);
        fs_1.default.createReadStream(videoPath).pipe(res);
    }
};
exports.playVideo = playVideo;
