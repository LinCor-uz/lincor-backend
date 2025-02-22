"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const loginSchema = zod_1.z.object({
    phone: zod_1.z.string(),
    password: zod_1.z.string(),
});
