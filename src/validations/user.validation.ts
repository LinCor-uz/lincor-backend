import { string, z } from "zod";

// const regionsEnum = z.enum([
//   "Toshkent",
//   "Samarqand",
//   "Buxoro",
//   "Andijon",
//   "Farg'ona",
//   "Namangan",
//   "Qashqadaryo",
//   "Surxondaryo",
//   "Jizzax",
//   "Sirdaryo",
//   "Xorazm",
//   "Navoiy",
//   "Qoraqalpog'iston Respublikasi",
//   "ko'rsatilmagan",
// ]);

export const userSchema = z.object({
  firstname: z
    .string()
    .min(3, "Firstname must be a string longer than 3 symbols"),
  lastname: z
    .string()
    .min(3, "Lastname must be a string longer than 3 symbols"),
  address: z.string().optional().nullable(),
  password: z
    .string()
    .min(8, "Password must be a string longer than 8 symbols"),
  phone: z
    .string()
    .regex(
      /^\+?[0-9]{9,}$/,
      "Phone number must be a valid format with at least 9 digits"
    ),
  refreshToken: z.string().optional().nullable(),
  ava_path: z.string().default("src/uploads/avatar/default-avatar.png"),
  isActive: z.boolean().default(false),
});

export type User = z.infer<typeof userSchema> & { id: number };
export type UserWithoutId = z.infer<typeof userSchema>;
