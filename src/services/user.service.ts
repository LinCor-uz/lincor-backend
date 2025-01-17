// import { User, userSchema } from "@validations";
// import { prisma } from "@config";
// import { ZodError, string } from "zod";
// import { hashPassword, sendError } from "@utils";

// interface IProfile {
//   id: number;
//   password?: string;
//   address?: string;
//   phone?: string;
//   ava_path?: string;
//   user_id?: string;
//   profileId?: number;
//   registered_at: Date;
// }

// interface IUser {
//   id: number;
//   phone?: string;
// }

// export const userService = {
//   async getMe(user: IUser) {
//     try {
//       const me = await prisma.user.findUnique({
//         where: { phone: user.phone },
//         include: { profile: true },
//       });

//       return me;
//     } catch (err) {
//       if (err instanceof ZodError) {
//         const validationError = err.errors.map((e) => e.message).join(", ");
//         throw new sendError(`Validation Error: ${validationError}`, 400);
//       }
//       throw err;
//     }
//   },

//   async editProfile(data: IProfile, user: IUser) {
//     let defaultImg: string | null = "upload/images/default.png";
//     if (!defaultImg) {
//       defaultImg = null;
//     }

//     try {
//       // Eski foydalanuvchi ma'lumotlarini olish
//       const oldUser = await prisma.user.findUnique({
//         where: { id: user.id },
//       });

//       if (!oldUser) {
//         throw new Error("User not found");
//       }

//       // Foydalanuvchining profili mavjudligini tekshirish
//       let profile = await prisma.profile.findUnique({
//         where: { user_id: user.id },
//       });

//       // Profil mavjud bo'lmasa, yangi profil yaratish
//       if (!profile) {
//         profile = await prisma.profile.create({
//           data: {
//             user_id: Number(user.id),
//             address: data.address ?? undefined,
//             ava_path: data.ava_path ?? defaultImg,
//             registered_at: new Date(data.registered_at),
//           },
//         });
//       }

//       // Parolni xeshlash (agar yangi parol yuborilgan bo'lsa)
//       const hashedPassword = data.password
//         ? await hashPassword(data.password)
//         : oldUser.password;

//       // Yangilash ma'lumotlari
//       const updateUser = {
//         password: hashedPassword,
//         phone: data.phone ?? oldUser.phone,
//       };

//       const updateProfile = {
//         address: data.address ?? profile.address,
//         ava_path: data.ava_path ?? profile.ava_path,
//       };
//       console.log(updateUser, updateProfile);

//       // Transaktsiya orqali ma'lumotlarni yangilash
//       const [updatedUser, updatedProfile] = await prisma.$transaction([
//         prisma.user.update({
//           where: { id: user.id },
//           data: updateUser,
//         }),
//         prisma.profile.update({
//           where: { user_id: user.id },
//           data: updateProfile,
//         }),
//       ]);

//       return { updatedUser, updatedProfile };
//     } catch (error) {}
//   },
// };
