import express from "express";

import { authRouter, categoryRouter, userRouter, videoRouter } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { getEnvVariable } from "././utils";
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

console.log(`http://localhost:${PORT}/api/v1/category/  -- Category ./router`);
console.log(`http://localhost:${PORT}/api/v1/video/  -- Video ./router`);
console.log(`http://localhost:${PORT}/api/v1/auth/  -- Auth ./router`);

// core settings
app.use(
  cors({
    origin: "*",
  })
);

app.use("/*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
