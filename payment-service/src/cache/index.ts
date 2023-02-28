import { createClient } from "redis";
import { accessEnv } from "../helpers";
import { UserCacheData } from "../contracts/types";
import { PaymentCacheDao } from "./PaymentCacheDao";

const env = accessEnv("ENV_CACHE").trim();

let client;
if (env === "prod") {
  client = createClient({
    url: accessEnv("REDIS_URL"),
  });
} else {
  client = createClient({
    url: accessEnv("REDIS_URL_LOCAL"),
  });
}

export class PaymentCache implements PaymentCacheDao {
  // ------------- update plan token in cache ----------------
  async updatePlanToken(user_id: string, plan_token: string): Promise<void> {
    try {
      await client.connect();
      await client
        .hSet(user_id, "plan_token", plan_token)
        .then(() => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      console.error("Error connecting to Redis:", error);
      process.exit(1);
    }
  }
  // ------------- get user from cache  ----------------
  async getCachedUser(user_id: string): Promise<UserCacheData> {
    try {
      await client.connect();
      const user = await client
        .hGetAll(user_id)
        .then((value: any) => {
          return Promise.resolve(value);
        })
        .catch((err: any) => {
          console.log(err);
          return Promise.reject(err);
        });
      client.disconnect();
      return user;
    } catch (error) {
      console.error("Error connecting to Redis:", error);
      process.exit(1);
    }
  }
}

export const cache = new PaymentCache();
