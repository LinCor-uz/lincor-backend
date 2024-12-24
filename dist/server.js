"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _utils_1 = require("@utils");
const app = (0, express_1.default)();
const PORT = (_a = (0, _utils_1.getEnvVariable)("SERVER_PORT")) !== null && _a !== void 0 ? _a : 8000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
