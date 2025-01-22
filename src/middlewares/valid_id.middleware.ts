import { z } from "zod";
import { NextFunction, Request, Response } from "express";

const validIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a numeric string"),
});

export const isValidId = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const isValid = validIdSchema.safeParse(req.params);

  // agar validatsiyada xatolik chiqsa error qayatarsin
  if (!isValid.success) {
    const errors = isValid.error.errors.map((error) => error.message);
    return res
      .status(400)
      .send({ success: false, errors:errors, message: "invalid ID" });
  }

  next();
};
