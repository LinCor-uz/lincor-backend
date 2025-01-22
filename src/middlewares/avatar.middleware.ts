import multer from "multer";
import * as fs from "node:fs";
import { sendError } from "../utils";

const avatarDir = "uploads/avatars/";

if (!fs.existsSync(avatarDir)) {
  fs.mkdirSync(avatarDir, { recursive: true });
}

// Fayl filtrini aniqlash
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  console.log("File Mimetype:", file.mimetype); // Fayl mimetype'ini tekshirish
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    const error = new sendError("File type not allowed", 403);
    return cb(error as any, false);
  }

  cb(null, true); // Faylni ruxsat etilganini ko'rsatish
};

// Fayl saqlash va nomlash
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `avatar-${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Multer ni eksport qilish
export const uploadAvatar = multer({
  storage,
  fileFilter, // Faylni filtrlash
});
