import { z } from "zod";

export const profileSchema = z.object({
  registered_at: z.preprocess(
    (value) => (typeof value === "string" ? new Date(value) : value),
    z.date()
  ),
  user_id: z.number(),
});
export type Profile = z.infer<typeof profileSchema>;
