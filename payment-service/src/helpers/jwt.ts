import { JwtPlanPayload } from "../contracts/types";
import jwt from "jsonwebtoken";
import { accessEnv } from "./accessEnv";
import { TokenExpiredError, VerifyErrors } from "jsonwebtoken";

const secret = accessEnv("JWT_SECRET");

/**
 * @param obj {JwtPlanPayload} {plan_id: string, user_id: string}
 * @param expire {string} 30d or 365d
 * @returns {string} token
 * @description create a token with the given payload and expiration time
 *
 */
export function createToken(obj: JwtPlanPayload, expire: string): string {
  return jwt.sign(obj, secret, { expiresIn: expire });
}

export function verifyToken(token: string): JwtPlanPayload {
  let payload: JwtPlanPayload;
  try {
    payload = jwt.verify(token, secret) as JwtPlanPayload;
    return payload;
  } catch (error) {
    const verifyErr = error as VerifyErrors;

    if (verifyErr instanceof TokenExpiredError) {
      throw new Error("TOKEN_EXPIRED");
    }
    throw new Error("BAD_TOKEN");
  }
}
