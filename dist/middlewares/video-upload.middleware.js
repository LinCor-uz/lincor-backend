"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = void 0;
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("node:fs"));
const utils_1 = require("../utils");
// Video fayllar uchun direktoriyani aniqlash
const videoDir = "uploads/video/";
if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
}
// Fayl filtrini aniqlash
const fileFilter = (req, file, cb) => {
    console.log("File Mimetype:", file.mimetype); // Fayl mimetype'ini tekshirish
    const allowedMimeTypes = [
        "video/mp4",
        "video/webm",
        "video/x-msvideo",
        "video/x-matroska",
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        const error2 = new utils_1.sendError("File type not allowed", 403);
        return cb(error2, false);
    }
    cb(null, true); // Faylni ruxsat etilganini ko'rsatish
};
// Fayl saqlash va nomlash
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, videoDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `video-${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
// Multer ni eksport qilish
exports.uploadVideo = (0, multer_1.default)({
    storage,
    fileFilter, // Faylni filtrlash
});
