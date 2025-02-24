"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const validations_1 = require("../validations");
const config_1 = require("../config");
const zod_1 = require("zod");
const utils_1 = require("../utils");
exports.userService = {
    getMe(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const me = yield config_1.prisma.user.findUnique({
                    where: { id: user.id },
                    include: { profile: { include: { profileCategories: true } } },
                });
                console.log(me);
                return me;
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    const validationError = err.errors.map((e) => e.message).join(", ");
                    throw new utils_1.sendError(`Validation Error: ${validationError}`, 400);
                }
                throw err;
            }
        });
    },
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield config_1.prisma.user.findMany({
                    include: { profile: true },
                });
                return users;
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    const validationError = err.errors.map((e) => e.message).join(", ");
                    throw new utils_1.sendError(`Validation Error: ${validationError}`, 400);
                }
                throw err;
            }
        });
    },
    editProfile(data, user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            try {
                // Eski foydalanuvchi ma'lumotlarini olish
                const oldUser = yield config_1.prisma.user.findUnique({
                    where: { id: user.id },
                });
                const validateData = validations_1.userSchema.partial().safeParse(data);
                if (!validateData.success) {
                    const validationError = validateData.error.errors
                        .map((e) => e.message)
                        .join(", ");
                    throw new utils_1.sendError(`Validation Error: ${validationError}`, 400);
                }
                if (!oldUser) {
                    throw new Error("User not found");
                }
                // Foydalanuvchining profili mavjudligini tekshirish
                let profile = yield config_1.prisma.profile.findUnique({
                    where: { user_id: user.id },
                });
                // Profil mavjud bo'lmasa, yangi profil yaratish
                if (!profile) {
                    console.log("profile #######");
                    yield config_1.prisma.profile.create({
                        data: {
                            user_id: Number(user.id),
                            registered_at: new Date().toISOString(),
                        },
                    });
                }
                // Parolni xeshlash (agar yangi parol yuborilgan bo'lsa)
                const hashedPassword = data.password
                    ? yield (0, utils_1.hashPassword)(data.password)
                    : oldUser.password;
                // Yangilash ma'lumotlari
                let updateUser = {
                    password: hashedPassword !== null && hashedPassword !== void 0 ? hashedPassword : oldUser.password,
                    phone: (_a = data.phone) !== null && _a !== void 0 ? _a : oldUser.phone,
                    address: (_c = (_b = data.address) !== null && _b !== void 0 ? _b : oldUser.address) !== null && _c !== void 0 ? _c : "toldirilmagan",
                    ava_path: (_d = data.ava_path) !== null && _d !== void 0 ? _d : oldUser.ava_path,
                    lastname: (_e = data.lastname) !== null && _e !== void 0 ? _e : oldUser.lastname,
                    firstname: (_f = data.firstname) !== null && _f !== void 0 ? _f : oldUser.firstname,
                };
                const newUserInfo = yield config_1.prisma.user.update({
                    where: { id: user.id },
                    data: updateUser,
                });
                console.log("after update user in here");
                return newUserInfo;
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    const validationError = err.errors.map((e) => e.message).join(", ");
                    throw new utils_1.sendError(`Validation Error: ${validationError}`, 400);
                }
                throw err;
            }
        });
    },
};
