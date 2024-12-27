import {z} from "zod";

export const videoSchema = z.object({
    title: z.string().min(3, "Video name must be a string longer than 3 symbols"),
    description: z.string().min(10, "Video description must be a string longer than 10 symbols"),
    video_path: z.string(),
    categoryId: z.number().min(0)
})

export type Video = z.infer<typeof videoSchema>
