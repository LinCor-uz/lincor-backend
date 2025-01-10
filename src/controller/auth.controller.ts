import { prisma } from "@config";
import { authService } from "@services";
import { generateAccessToken, getEnvVariable, verifyToken } from "@utils";
import { Request, Response } from "express";

export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const date = req.body;

      let { refreshToken, accessToken } = await authService.login(date);

      res.cookie("refreshToken", refreshToken, { httpOnly: true });

      res.send({ accessToken });
    } catch (error: unknown) {
      const err = error as Error;
      console.log("#ERROR userLogin - ", err);
      res.status(500).send({ success: false, error: err.message });
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      let data = { ...req.body, refreshToken: null };

      let newUser = await authService.register(data);

      res.send({
        success: true,
        message: "Successfuly registered",
        newUser,
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.log("#ERROR userRegister - ", err);
      res.status(500).send({ success: false, error: err.message });
    }
  },

  refreshToken: async (res: Response, req: Request) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token" });
    }
    const user = await prisma.user.findFirst({ where: { refreshToken } });

    if (!user) {
      return res
        .status(403)
        .send({ success: false, message: "Invalid or expired refresh token" });
    }

    const { payload, expired } = verifyToken(
      refreshToken,
      getEnvVariable("REFRESH_TOKEN_SECRET")!
    );

    if (expired || !payload) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(user);
    res.send({ token: accessToken });
  },
  logout: async (res: Response, req: Request) => {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      const user = await prisma.user.findFirst({ where: { refreshToken } });

      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken: " " },
        });
      }
    }

    res.clearCookie("refreshToken");
    res.status(200).send({ success: true, message: "Successfuly logout" });
  },
};
