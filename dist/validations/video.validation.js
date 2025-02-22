"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoSchema = void 0;
const zod_1 = require("zod");
exports.videoSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Video name must be a string longer than 3 symbols"),
    description: zod_1.z.string().min(10, "Video description must be a string longer than 10 symbols"),
    video_path: zod_1.z.string(),
    categoryId: zod_1.z.number().min(0)
});
