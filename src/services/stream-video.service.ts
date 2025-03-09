import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const videoDir = path.join(__dirname, "../../uploads/video");

if (!fs.existsSync(videoDir)) {
  console.log("📂 Creating video directory...");
  fs.mkdirSync(videoDir, { recursive: true });
}

export const streamVideo = (req: Request, res: Response) => {
  const { filename } = req.params;
  const range = req.headers.range;

  if (!range) {
    return res.status(400).json({ error: "Range header required" });
  }

  const videoPath = path.join(videoDir, filename);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: "Video not found" });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  // const chunkSize = 10 ** 6; // 1MB chunk size // 10kb chunk size for testing 
  const chunkSize = 1024 * 1024; //  1MB chunk size

  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + chunkSize, fileSize - 1);

  const file = fs.createReadStream(videoPath, { start, end });

  const head = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, head);
  file.pipe(res);
};
