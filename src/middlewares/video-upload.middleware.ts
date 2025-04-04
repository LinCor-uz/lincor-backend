import multer from "multer";
import * as fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // .env faylni yuklash

const videoDir = path.join(__dirname, "../../uploads/video");

// Agar direktoriy yo‘q bo‘lsa, yaratish
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

// Ruxsat berilgan fayl turlari
const allowedMimeTypes = ["video/mp4", "video/webm", "video/x-msvideo", "video/x-matroska"];

// Fayl filtrini o‘rnatish
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  console.log(" Fayl yuklanmoqda:", file.originalname);
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(Error as any, false);
  }
  cb(null, true);
};

// Faylni saqlash va nomlash
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `video-${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Multer middleware'ni eksport qilish
export const uploadVideo = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 2048 * 1024 * 1024 // 50MB limit
  }
});
