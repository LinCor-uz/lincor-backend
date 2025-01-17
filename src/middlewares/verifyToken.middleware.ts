import { verify } from "@utils";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const checkAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Access token required",
    });
  }

  const { payload, expired } = verify(token);

  // Agar token muddati tugagan bo'lsa yoki noto'g'ri token bo'lsa
  if (expired || !payload) {
    return res.status(401).send({
      success: false,
      message: "Invalid or expired access token, verifyToken fn()",
    });
  }

  req.user = payload;

  next();
};

export const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(403).send({
      success: false,
      message: "Refresh token required",
    });
  }
  try {
    const decoded = verify(refreshToken);

    if (!decoded) {
      res.status(401).send({
        success: false,
        message: "Invalid or expired refreshToken",
      });
      return;
    }

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Invalid or expired refreshToken",
    });
    return;
  }
};
