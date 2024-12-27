import {Request, Response} from "express";
import {videoService} from "@services";
import {sendError} from "@utils";

export const videoController = {
    createVideo: async (req: Request, res: Response) => {
        try {
            req.body.categoryId = Number(req.body.categoryId);
            console.log(req.file)
            const data = {
                ...req.body,
                video_path: req.file?.path
            }

            const result = await videoService.createVideo(data)

            res.status(201).send({
                success: true,
                data: result
            })
        } catch (error: unknown) {
            const err = error as sendError
            console.log("###ERROR in createVideo ", err.message)
            res.status(err.statusCode || 500).send({success: false, error: err.message})
        }
    },

    deleteVideo: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            await videoService.deleteVideo(id)

            res.status(200).send({success: true, message: 'Video deleted successfully'})
        } catch (error: unknown) {
            const err = error as sendError
            res.status(err.statusCode || 500).send({success: false, error: err.message})
        }
    },


    findAllVideos: async (req: Request, res: Response) => {
        try {
            const data = await videoService.getAllVideos()

            res.status(200).send({
                success: true,
                data
            })
        } catch (error: unknown) {
            const err = error as sendError
            console.log("#ERROR getAllVideo - ", err.message)
            res.status(err.statusCode || 500).send({success: false, error: err.message})
        }
    }
}