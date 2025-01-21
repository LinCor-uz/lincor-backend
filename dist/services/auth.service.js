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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const _config_1 = require("@config");
const _utils_1 = require("@utils");
const _validations_1 = require("@validations");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.authService = {
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.password || !data.phone) {
                throw new _utils_1.sendError("Please fill all section", 403);
            }
            const user = yield _config_1.prisma.user.findUnique({ where: { phone: data.phone } });
            if (!user) {
                throw new _utils_1.sendError("User not found", 404);
            }
            const isPasswordValid = yield bcrypt_1.default.compare(data.password, user.password);
            if (!isPasswordValid) {
                throw new _utils_1.sendError("Inncorrect data", 400);
            }
            const accessToken = (0, _utils_1.generateAccessToken)(user);
            const refreshToken = yield (0, _utils_1.generateRefreshToken)(user);
            return { accessToken, refreshToken, user };
        });
    },
    register(data, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield _config_1.prisma.user.findFirst({
                    where: { phone: data.phone },
                });
                if (user) {
                    throw new _utils_1.sendError("User already exist", 409);
                }
                const validatedData = _validations_1.userSchema.parse(Object.assign(Object.assign({}, data), { ava_path: (file === null || file === void 0 ? void 0 : file.path) || undefined }));
                if (!validatedData) {
                    throw new _utils_1.sendError("Please fill all section", 400);
                }
                const hashedPassword = yield (0, _utils_1.hashPassword)(data.password);
                return yield _config_1.prisma.user.create({
                    data: Object.assign(Object.assign({}, validatedData), { password: hashedPassword }),
                });
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = error.errors
                        .map((error) => error.message)
                        .join(", ");
                    console.log(error);
                    throw new _utils_1.sendError(`Validation Error ${validationError}`, 400);
                }
                throw error;
            }
        });
    },
};
