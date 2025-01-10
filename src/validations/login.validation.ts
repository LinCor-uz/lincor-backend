import { strictObject, string, z } from "zod";

const loginSchema = z.object({
  phone: z.string(),
  password: z.string(),
});

export type LoginUser = z.infer<typeof loginSchema>;
