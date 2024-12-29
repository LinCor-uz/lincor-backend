import express from "express";
import { getEnvVariable } from "@utils";
import { categoryRouter, userRouter, videoRouter } from "@router";
import cookieParser from "cookie-parser";

const app = express();
const PORT = getEnvVariable("SERVER_PORT") ?? 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// base routes
app
  .use("/api/v1/category", categoryRouter)
  .use("/api/v1/video", videoRouter)
  .use("/api/v1/user", userRouter);

app.use("/*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
