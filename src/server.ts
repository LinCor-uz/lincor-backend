import express from "express";
import { getEnvVariable } from "@utils";
import { authRouter, categoryRouter, userRouter, videoRouter } from "@router";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const PORT = getEnvVariable("SERVER_PORT") || "8000";

app.use(express.json({ limit: "125Mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(getEnvVariable("COOKIE_SECRET") || ""));

// base routes
app
  .use("/api/v1/category", categoryRouter)
  .use("/api/v1/video", videoRouter)
  .use("/api/v1/user", userRouter)
  .use("/api/v1/auth", authRouter);

console.log("Base URi's");

console.log(`http://localhost:${PORT}/api/v1/category/  -- Category Router`);
console.log(`http://localhost:${PORT}/api/v1/video/  -- Video Router`);
console.log(`http://localhost:${PORT}/api/v1/auth/  -- Auth Router`);

// core settings
app.use(cors());

app.use("/*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
