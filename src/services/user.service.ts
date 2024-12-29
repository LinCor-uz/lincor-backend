import { User, userSchema } from "@validations";
import { prisma } from "@config";
import { ZodError } from "zod";
import { sendError } from "@utils";

export const userService = {
  async registerUser(data: unknown): Promise<User> {
    try {
      const validatedData = userSchema.parse(data);
      const phone = validatedData.phone;
      const checkPhone = await prisma.user.findUnique({ where: { phone } });
      if (checkPhone) {
        throw new sendError("Phone already exist in DB", 403);
      }

      return await prisma.user.create({ data: validatedData });
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = err.errors.map((e) => e.message).join(", ");
        throw new sendError(`Validation Error: ${validationError}`, 400);
      }
      throw err;
    }
  },
};
