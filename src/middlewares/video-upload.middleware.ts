import multer from "multer";
import * as fs from "node:fs";
import { sendError } from "../utils";
import path from "node:path";

// Video fayllar uchun direktoriyani aniqlash
const videoDir = path.join(__dirname, "../../uploads/videos");

if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

// Fayl filtrini aniqlash
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  console.log("File Mimetype:", file.mimetype); // Fayl mimetype'ini tekshirish
  const allowedMimeTypes = [
    "video/mp4",
    "video/webm",
    "video/x-msvideo",
    "video/x-matroska",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    const error2 = new sendError("File type not allowed", 403);
    return cb(error2 as any, false);
  }

  cb(null, true); // Faylni ruxsat etilganini ko'rsatish
};

// Fayl saqlash va nomlash
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `video-${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Multer ni eksport qilish
export const uploadVideo = multer({
  storage,
  fileFilter, // Faylni filtrlash
});
