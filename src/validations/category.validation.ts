import { z } from "zod";

export const categorySchema = z.object({
  category_name: z
    .string()
    .min(3, "Category name must be a string longer than 3 symbols"),
  category_desc: z
    .string()
    .min(10, "Category description must be a string longer than 10 symbols"),
  workbook_path: z.string().optional().nullable(),
  price: z.number().default(0),
});

export type Category = z.infer<typeof categorySchema>;
