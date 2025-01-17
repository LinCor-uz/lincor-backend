import bcrypt from "bcrypt";

// Parolni xesh qilish funksiyasi
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Xavfsizlik darajasi (10 standart)
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

// Parolni tekshirish funksiyasi
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
