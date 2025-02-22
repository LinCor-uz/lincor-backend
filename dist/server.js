"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const PORT = (0, utils_1.getEnvVariable)("SERVER_PORT") || 8000;
app.use(express_1.default.static("uploads"));
app.use(express_1.default.json({ limit: "125Mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)((0, utils_1.getEnvVariable)("COOKIE_SECRET") || ""));
// base routes
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.options("*", (0, cors_1.default)());
app
    .use("/category", routes_1.categoryRouter)
    .use("/video", routes_1.videoRouter)
    .use("/user", routes_1.userRouter)
    .use("/auth", routes_1.authRouter);
app.use("/*", (_, res) => {
    res.status(404).send("Page Not Found");
});
app.use("/", (_, res) => {
    res.send("Welcome to LinCor.uz API server 🚀");
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
