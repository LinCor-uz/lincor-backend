
import { getEnvVariable } from "./dotenv";
import { prisma } from "../config";
import { sign } from "./jwt";
interface IUser {
  id: number;
  phone: string;
}
export const generateAccessToken = (user: IUser) => {
  const payload = {
    phone: user.phone,
    id: user.id,
  };
  return sign(payload, getEnvVariable("ACCESS_TOKEN_LIFE")!);
};

export const generateRefreshToken = async (user: IUser) => {
  const payload = {
    phone: user?.phone,
    id: user?.id,
  };
  const refreshToken = sign(payload, getEnvVariable("REFRESH_TOKEN_LIFE")!);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });
  // console.log("REFRESH TOKEN GENRATOR ###", refreshToken);

  return refreshToken;
};
