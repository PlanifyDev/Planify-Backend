import { JwtPayload } from "../contracts/types";
import jwt from "jsonwebtoken";
import accessEnv from "./accessEnv";

const secret = accessEnv("JWT_SECRET");
export function createToken(obj: JwtPayload): string {
  return jwt.sign(obj, secret);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, secret) as JwtPayload;
}
