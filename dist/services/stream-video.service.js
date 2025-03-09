"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamVideo = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const videoDir = path_1.default.join(__dirname, "../../uploads/video");
if (!fs_1.default.existsSync(videoDir)) {
    console.log("📂 Creating video directory...");
    fs_1.default.mkdirSync(videoDir, { recursive: true });
}
const streamVideo = (req, res) => {
    const { filename } = req.params;
    const range = req.headers.range;
    if (!range) {
        return res.status(400).json({ error: "Range header required" });
    }
    const videoPath = path_1.default.join(videoDir, filename);
    if (!fs_1.default.existsSync(videoPath)) {
        return res.status(404).json({ error: "Video not found" });
    }
    const stat = fs_1.default.statSync(videoPath);
    const fileSize = stat.size;
    // const chunkSize = 10 ** 6; // 1MB chunk size // 10kb chunk size for testing 
    const chunkSize = 1024 * 1024; //  1MB chunk size
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + chunkSize, fileSize - 1);
    const file = fs_1.default.createReadStream(videoPath, { start, end });
    const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
};
exports.streamVideo = streamVideo;
