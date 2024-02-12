import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
