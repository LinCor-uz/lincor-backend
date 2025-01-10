import { prisma } from "@config";
import { generateAccessToken, generateRefreshToken, sendError } from "@utils";
import { User, userSchema } from "@validations";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

interface LoginData {
  password: string;
  phone: string;
}

export const authService = {
  async login(data: LoginData) {
    if (!data.password || !data.phone) {
      throw new sendError("Please fill all section", 403);
    }

    const user = await prisma.user.findUnique({ where: { phone: data.phone } });
    if (!user) {
      throw new sendError("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new sendError("Inncorrect data", 400);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    return { accessToken, refreshToken };
  },

  async register(data: User): Promise<User> {
    try {
      const user = await prisma.user.findFirst({
        where: { phone: data.phone },
      });

      if (user) {
        throw new sendError("User already exist", 409);
      }

      const validateData = userSchema.parse(data);

      const hashedPassword = await bcrypt.hash(data.password, 10);

      return await prisma.user.create({
        data: {
          ...validateData,
          refreshToken: validateData.refreshToken || " ",
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = error.errors
          .map((error) => error.message)
          .join(", ");
        throw new sendError(`Validation Error ${validationError}`, 400);
      }
      throw error;
    }
  },
};
