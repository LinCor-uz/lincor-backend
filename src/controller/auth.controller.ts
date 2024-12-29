import { createAccessToken, createRefreshToken, verifyToken } from "@services";
import { sendError } from "@utils";
import { Request, Response } from "express";

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies["r_AUTH"];
    if (!refreshToken) {
      return res.status(403).send({
        success: false,
        messsage: "Refresh token is required",
      });
    }

    const user = verifyToken(refreshToken);

    const accessToken = createAccessToken(user.userId);

    const newRefreshToken = createRefreshToken(user.userId);

    res.cookie("R_AUTH", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).send(accessToken);
  } catch (error) {
    throw new sendError("Something went wrong in Token secton", 403);
  }
};
