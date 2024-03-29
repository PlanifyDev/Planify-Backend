import dotenv from "dotenv";
dotenv.config();

const cache = {};

export const accessEnv = (key: string) => {
  if (!(key in process.env)) {
    console.log(`${key} not found in process.env!`);
    process.exit(1);
  }

  if (cache[key]) {
    return cache[key];
  }

  cache[key] = process.env[key];

  return process.env[key];
};
