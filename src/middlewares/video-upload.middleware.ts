import multer from "multer"
import * as path from "node:path";
import * as process from "node:process";
import * as fs from "node:fs";
import {sendError} from "@utils";

const videoDir = path.join(process.cwd(), "uploads", "video"); // path = LinCor.uz/uploads/video

if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, {recursive: true});
}

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ["video/mp4", "video/webm", "video/x-msvideo", "video/x-matroska"] // mp4, webm, avi, mkv video type'lar

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        // @ts-ignore
        cb(new sendError("Only mp4, webm, avi, mkv types allowed to upload", 403), false);
    }
}


const storege = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, videoDir)
    },
    filename: (req, file, cb) => {
        const uniqueName = `workbook-${Date.now()}-${file.originalname}`

        cb(null, uniqueName)
    }
})

export const uploadVideo = multer({
    storage: storege
})