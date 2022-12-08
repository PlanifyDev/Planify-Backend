import { JwtPayload } from "../contracts/types";
import jwt from "jsonwebtoken";
import { accessEnv } from "./accessEnv";
import { TokenExpiredError, VerifyErrors } from "jsonwebtoken";

const secret = accessEnv("JWT_SECRET");
export function createToken(obj: JwtPayload, expire: string = "1y"): string {
  return jwt.sign(obj, secret, { expiresIn: expire });
}

export function verifyToken(token: string): JwtPayload {
  let payload: JwtPayload;
  try {
    payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  } catch (error) {
    const verifyErr = error as VerifyErrors;

    if (verifyErr instanceof TokenExpiredError) {
      throw new Error("TOKEN_EXPIRED");
    }
    throw new Error("BAD_TOKEN");
  }
}
