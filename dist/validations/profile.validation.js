"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileSchema = void 0;
const zod_1 = require("zod");
exports.profileSchema = zod_1.z.object({
    registered_at: zod_1.z.preprocess((value) => (typeof value === "string" ? new Date(value) : value), zod_1.z.date()),
    user_id: zod_1.z.number(),
    payed: zod_1.z.number().default(0),
});
