import { Router } from "express";
import { videoController } from "../controller";
import { isValidId, uploadVideo } from "../middlewares";

export const videoRouter = Router();

videoRouter
  .post("/", uploadVideo.single("video"), videoController.createVideo)
  .delete("/:id", isValidId, videoController.deleteVideo)
  .get("/", videoController.findAllVideos)
  .put(
    "/:id",
    isValidId,
    uploadVideo.single("video"),
    videoController.updateVideo
  )
  .get("/:filename", videoController.getVideo);
