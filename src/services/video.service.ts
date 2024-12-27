import {Video, videoSchema} from "@validations";
import {prisma} from "@config";
import {ZodError} from "zod";
import {sendError} from "@utils";

export const videoService = {
    // create video service
    async createVideo(data: unknown): Promise<Video> {
        try {
            console.log(data);
            const validateData = videoSchema.parse(data);
            return await prisma.video.create({data: validateData});

        } catch (err) {
            if (err instanceof ZodError) {
                const validationError = err.errors.map((e) => e.message).join(", ");
                throw new sendError(`Validation Error: ${validationError}`, 400);
            }
            throw err
        }
    },

    // delete video service
    async deleteVideo(id: number): Promise<void> {
        const findById = await prisma.video.findUnique({where: {id}})

        if (!findById) {
            throw new sendError("Video not found", 404)
        } else {
            await prisma.video.delete({where: {id}})
        }

    },

    //get all videos service
    async getAllVideos(): Promise<Video[]> {
        console.log("Getting all videos")
        return prisma.video.findMany({include: {Category: true}})
    }

}