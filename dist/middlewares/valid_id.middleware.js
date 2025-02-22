"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = void 0;
const zod_1 = require("zod");
const validIdSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, "ID must be a numeric string"),
});
const isValidId = (req, res, next) => {
    const isValid = validIdSchema.safeParse(req.params);
    // agar validatsiyada xatolik chiqsa error qayatarsin
    if (!isValid.success) {
        const errors = isValid.error.errors.map((error) => error.message);
        return res
            .status(400)
            .send({ success: false, errors: errors, message: "invalid ID" });
    }
    next();
};
exports.isValidId = isValidId;
