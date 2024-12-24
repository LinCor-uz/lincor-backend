import dotenv from "dotenv";

dotenv.config();

export const getEnvVariable = (key: string): string | null => {
    const value = process.env[key];
    if (value === undefined) {
        console.log(`Xato: ${key} muhit o'zgaruvchisi topilmadi`);
        return null;
    }
    return value;
}

