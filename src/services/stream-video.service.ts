import { log } from "console";
import { Response } from "express";
import fs from "fs";
import path from "path";
import { sendError } from "../utils";

const videoDir = path.join(__dirname, "../../uploads/video");

if (!videoDir) {
  log("Creating video directory not found");
}

type range = {
  start: number;
  end: number;
};

export const playVideo = (
  filename: string,
  renge: range | any,
  res: Response
) => {
  const videoPath = path.join(videoDir, filename);

  if (fs.existsSync(videoPath)) {
    new sendError("Video not found", 404);
    return;
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const chunkSize = 1024 * 1024; // 1mb chunk size

  if (renge) {
    const parts = renge.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = Math.min(start + chunkSize, fileSize - 1);

    const file = fs.createReadStream(videoPath, { start, end });

    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
};
