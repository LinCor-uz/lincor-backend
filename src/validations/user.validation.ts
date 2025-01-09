import { z } from "zod";

export const userSchema = z.object({
  firstname: z
    .string()
    .min(3, "Firstname must be a string longer than 3 symbols"),
  lastname: z
    .string()
    .min(3, "Lastname must be a string longer than 3 symbols"),
  password: z
    .string()
    .min(8, "Password must be a string longer than 3 symbols"),
  phone: z
    .string()
    .regex(
      /^\+?[0-9]{9,}$/,
      "Phone number must be a valid format with at least 9 digits"
    ),
  refreshToken: z.string().nullable().optional(),
  profileId: z.number().min(0).optional().nullable(),
});

export type User = z.infer<typeof userSchema>;
