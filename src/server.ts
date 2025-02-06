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

app.use("/", (req, res) => {
  res.send("API WORKING !!!");
});

app.use("/*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
