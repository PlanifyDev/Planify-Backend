import bcrypt from "bcrypt";
import accessEnv from "./accessEnv";

const slatRound = accessEnv("SALT_ROUND");

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, parseInt(slatRound));
};

export const comparePassword = async (
  password: string,
  hashpassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashpassword);
  return isMatch;
};
