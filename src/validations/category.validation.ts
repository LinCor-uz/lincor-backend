import {z} from "zod";

export const categorySchema = z.object({
    category_name: z.string().min(3, "Category name must be a string longer than 3 symbols"),
    category_desc: z.string().min(10, "Category description must be a string longer than 10 symbols"),
    workbook_path: z.string().optional(),
    price: z.number().optional(),
})

export const videoSchema = z.object({
    title: z.string().min(3, "Video name must be a string longer than 3 symbols"),
    description: z.string().min(10, "Video description must be a string longer than 10 symbols"),
    reviewImg_path: z.string().optional(),
    video_path: z.string()

})

export const userSchema = z.object({
    firstname: z.string().min(3, "Firstname must be a string longer than 3 symbols"),
    lastname: z.string().min(3, "Lastname must be a string longer than 3 symbols"),
    phone: z.string().regex(/^\+998\d{9}$/, "Phone number must be a valid Uzbekistan number starting with +998 followed by 9 digits.")
})

export const profileSchema = z.object({
    // address: z.string(). enum kiritush kerak
})

export type Category = z.infer<typeof categorySchema>
export type Video = z.infer<typeof videoSchema>
export type User = z.infer<typeof userSchema>