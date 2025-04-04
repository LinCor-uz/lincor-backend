import express from "express";
import path from "path";
import { authRouter, categoryRouter, userRouter, videoRouter } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { getEnvVariable } from "./utils";

const app = express();
const PORT = getEnvVariable("SERVER_PORT") || 8000;

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(express.json({ limit: "2048Mb" }));
app.use(express.urlencoded({ extended: true, limit: "2048Mb" }));
app.use(cookieParser(getEnvVariable("COOKIE_SECRET") || ""));

// base routes
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.options("*", cors());

app
  .use("/category", categoryRouter)
  .use("/video", videoRouter)
  .use("/user", userRouter)
  .use("/auth", authRouter);

app.use("/*", (_, res) => {
  res.status(404).send("Page Not Found");
});

app.use("/", (_, res) => {
  res.send("Welcome to LinCor.uz API server 🚀");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


