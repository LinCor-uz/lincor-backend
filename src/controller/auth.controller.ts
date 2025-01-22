import { authService } from "../services";
import { prisma } from "../config";
import { generateAccessToken, generateRefreshToken, verify } from "../utils";
import { Request, Response } from "express";
import Redis from "ioredis";

const redis = new Redis();

export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const date = req.body;

      let { refreshToken, accessToken, user } = await authService.login(date);

      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      await redis.set(`user:${user.id}`, accessToken);

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

      let newUser = await authService.register(data, req.file);
      console.log(newUser);

      const accessToken = generateAccessToken({
        id: newUser.id,
        phone: newUser.phone,
      });
      const refreshToken = await generateRefreshToken(newUser);

      res.cookie("accessToken", accessToken, { httpOnly: false });
      res.cookie("refreshToken", refreshToken, { httpOnly: false });

      res.status(201).send({
        success: true,
        newUser,
        accessToken,
        refreshToken,
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.log("#ERROR userRegister - ", err);
      res.status(500).send({ success: false, error: err.message });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    // Check the refresh token in cookies
    if (!refreshToken) {
      res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }

    try {
      // Verify if the refresh token exists in the database
      const user = await prisma.user.findFirst({ where: { refreshToken } });
      if (!user) {
        res.status(403).json({
          success: false,
          message: "Invalid or expired refresh token",
        });
        return;
      }

      const { payload, expired } = verify(refreshToken);

      if (expired || !payload) {
        res.status(401).json({
          success: false,
          message: "Invalid or expired refresh token",
        });
        return;
      }

      const accessToken = generateAccessToken(user);
      res.status(200).json({
        success: true,
        token: accessToken,
      });
    } catch (error) {
      console.error("Error handling refresh token:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  logout: async (res: Response, req: Request) => {
    try {
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
    } catch (error: unknown) {
      const err = error as Error;
      console.log("#ERROR logOut - ", err);
      res.status(500).send({ success: false, error: err.message });
    }
  },
};
