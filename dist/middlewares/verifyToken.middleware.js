"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.checkAccessToken = void 0;
const utils_1 = require("../utils");
const checkAccessToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).send({
            success: false,
            message: "Access token required",
        });
    }
    const { payload, expired } = (0, utils_1.verify)(token);
    // Agar token muddati tugagan bo'lsa yoki noto'g'ri token bo'lsa
    if (expired || !payload) {
        return res.status(401).send({
            success: false,
            message: "Invalid or expired access token, verifyToken fn()",
        });
    }
    req.user = payload;
    next();
};
exports.checkAccessToken = checkAccessToken;
const verifyRefreshToken = (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        res.status(403).send({
            success: false,
            message: "Refresh token required",
        });
    }
    try {
        const decoded = (0, utils_1.verify)(refreshToken);
        if (!decoded) {
            res.status(401).send({
                success: false,
                message: "Invalid or expired refreshToken",
            });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).send({
            success: false,
            message: "Invalid or expired refreshToken",
        });
        return;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
