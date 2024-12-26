import multer from "multer"
import * as path from "node:path";
import * as process from "node:process";
import * as fs from "node:fs";

const fileDir = path.join(__dirname, "..", "uploads", "workbook");

if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, {recursive: true});
}

const storege = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, fileDir)
    },
    filename: (req, file, cb) => {
        const uniqueName = `workbook-${Date.now()}-${file.originalname}`

        cb(null, uniqueName)
    }
})

export const upload = multer({
    storage: storege
})