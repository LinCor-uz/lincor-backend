import { User, userSchema } from "../validations";
import { prisma } from "../config";
import { ZodError, string } from "zod";
import { hashPassword, sendError } from "../utils";

interface IProfile {
  id: number;
  lastname: string;
  firstname: string;
  password?: string;
  address?: string;
  phone?: string;
  payed: number;
  ava_path?: string;
  user_id?: string;
  profileId?: number;
  registered_at: Date;
}

interface IUser {
  id: number;
  phone?: string;
}

export const userService = {
  async getMe(user: IUser) {
    try {
      const me = await prisma.user.findUnique({
        where: { id: user.id },
        include: { profile: { include: { profileCategories: true } } },
      });

      console.log(me);

      return me;
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = err.errors.map((e) => e.message).join(", ");
        throw new sendError(`Validation Error: ${validationError}`, 400);
      }
      throw err;
    }
  },

  async getAllUser() {
    try {
      const users = await prisma.user.findMany({
        include: { profile: true },
      });

      return users;
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = err.errors.map((e) => e.message).join(", ");
        throw new sendError(`Validation Error: ${validationError}`, 400);
      }
      throw err;
    }
  },

  async editProfile(data: IProfile, user: IUser) {
    try {
      // Eski foydalanuvchi ma'lumotlarini olish
      const oldUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      const validateData = userSchema.partial().safeParse(data);

      if (!validateData.success) {
        const validationError = validateData.error.errors
          .map((e) => e.message)
          .join(", ");
        throw new sendError(`Validation Error: ${validationError}`, 400);
      }

      if (!oldUser) {
        throw new Error("User not found");
      }

      // Foydalanuvchining profili mavjudligini tekshirish
      let profile = await prisma.profile.findUnique({
        where: { user_id: user.id },
      });

      // Profil mavjud bo'lmasa, yangi profil yaratish
      if (!profile) {
        console.log("profile #######");

        await prisma.profile.create({
          data: {
            user_id: Number(user.id),
            registered_at: new Date().toISOString(),
          },
        });
      }

      // Parolni xeshlash (agar yangi parol yuborilgan bo'lsa)
      const hashedPassword = data.password
        ? await hashPassword(data.password)
        : oldUser.password;

      // Yangilash ma'lumotlari
      let updateUser = {
        password: hashedPassword ?? oldUser.password,
        phone: data.phone ?? oldUser.phone,
        address: data.address ?? oldUser.address ?? "toldirilmagan",
        ava_path: data.ava_path ?? oldUser.ava_path,
        lastname: data.lastname ?? oldUser.lastname,
        firstname: data.firstname ?? oldUser.firstname,
      };

      const newUserInfo = await prisma.user.update({
        where: { id: user.id },
        data: updateUser,
      });
      console.log("after update user in here");

      return newUserInfo;
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = err.errors.map((e) => e.message).join(", ");
        throw new sendError(`Validation Error: ${validationError}`, 400);
      }
      throw err;
    }
  },
};
