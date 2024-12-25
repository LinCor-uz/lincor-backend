import {z} from "zod";

export const userSchema = z.object({
    firstname: z.string().min(3, "Firstname must be a string longer than 3 symbols"),
    lastname: z.string().min(3, "Lastname must be a string longer than 3 symbols"),
    phone: z.string().regex(/^\+998\d{9}$/, "Phone number must be a valid Uzbekistan number starting with +998 followed by 9 digits.")
})

export type User = z.infer<typeof userSchema>
