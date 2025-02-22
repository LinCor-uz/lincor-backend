"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z.object({
    category_name: zod_1.z
        .string()
        .min(3, "Category name must be a string longer than 3 symbols"),
    category_desc: zod_1.z
        .string()
        .min(10, "Category description must be a string longer than 10 symbols"),
    workbook_path: zod_1.z.string().optional().nullable(),
    price: zod_1.z.number().default(0),
});
