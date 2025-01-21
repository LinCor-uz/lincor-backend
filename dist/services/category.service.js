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
exports.categoryService = void 0;
const _config_1 = require("@config");
const _validations_1 = require("@validations");
const _utils_1 = require("@utils");
const zod_1 = require("zod");
exports.categoryService = {
    // get all categories
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return _config_1.prisma.category.findMany({ include: { videos: true } });
        });
    },
    // find category by ID
    findCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield _config_1.prisma.category.findUnique({
                where: { id },
                include: { videos: true },
            });
            if (!category) {
                throw new _utils_1.sendError("Category not found", 404);
            }
            return category;
        });
    },
    // create category
    createCategoryService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // kelgan datani validatsiya qilish
                const validatedData = _validations_1.categorySchema.parse(data);
                // Prisma orqali saqlash va natijani qaytarish
                return yield _config_1.prisma.category.create({
                    data: validatedData,
                });
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = error.errors
                        .map((error) => error.message)
                        .join(", ");
                    throw new _utils_1.sendError(`Validation Error ${validationError}`, 400);
                }
                throw error;
            }
        });
    },
    // update category by ID
    updateCategoryService(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const findById = yield _config_1.prisma.category.findUnique({ where: { id } });
            if (!findById) {
                throw new _utils_1.sendError("Category not found", 404);
            }
            // validatsiyani hammasini optional qilish update uchun
            const categoryUpdateSchema = _validations_1.categorySchema.partial();
            try {
                // kelgan datani validatsiya qilish
                const validatedData = categoryUpdateSchema.parse(data);
                return _config_1.prisma.category.update({ where: { id }, data: validatedData });
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = error.errors
                        .map((error) => error.message)
                        .join(", ");
                    throw new _utils_1.sendError(`Validation Error ${validationError}`, 400);
                }
                throw error;
            }
        });
    },
    // delete category by ID
    deleteCategoryService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findById = yield _config_1.prisma.category.findUnique({ where: { id } });
            if (!findById) {
                throw new _utils_1.sendError("Category not found", 404);
            }
            else {
                yield _config_1.prisma.category.delete({ where: { id } });
            }
        });
    },
};
