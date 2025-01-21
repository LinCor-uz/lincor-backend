"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
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
exports.userSchema = zod_1.z.object({
    firstname: zod_1.z
        .string()
        .min(3, "Firstname must be a string longer than 3 symbols"),
    lastname: zod_1.z
        .string()
        .min(3, "Lastname must be a string longer than 3 symbols"),
    address: zod_1.z.string().optional().nullable(),
    password: zod_1.z
        .string()
        .min(8, "Password must be a string longer than 8 symbols"),
    phone: zod_1.z
        .string()
        .regex(/^\+?[0-9]{9,}$/, "Phone number must be a valid format with at least 9 digits"),
    refreshToken: zod_1.z.string().optional().nullable(),
    ava_path: zod_1.z.string().default("src/uploads/avatar/default-avatar.png"),
    isActive: zod_1.z.boolean().default(false),
});
