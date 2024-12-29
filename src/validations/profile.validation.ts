import { z } from "zod";

const regionsEnum = z.enum([
  "Toshkent",
  "Samarqand",
  "Buxoro",
  "Andijon",
  "Farg'ona",
  "Namangan",
  "Qashqadaryo",
  "Surxondaryo",
  "Jizzax",
  "Sirdaryo",
  "Xorazm",
  "Navoiy",
  "Qoraqalpog'iston Respublikasi",
]);

export const profileSchema = z.object({
  address: regionsEnum,
  ava_path: z.string().optional(),
  registered_at: z.date(),
  isActive: z.boolean().default(false),
});
export type Profile = z.infer<typeof profileSchema>;
