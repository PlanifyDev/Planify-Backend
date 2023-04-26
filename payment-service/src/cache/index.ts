import { createClient } from "redis";
import { accessEnv } from "../helpers";
import { Plan, UserCacheData } from "../contracts/types";
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

(async () => {
  try {
    await client.connect();
    console.log("Redis connected successfully ✅ ✅ ✅ ");
    client.disconnect();
  } catch (error) {
    console.log(
      "Error connecting to Redis ❌ ❌ ❌ ❌ ❌ ❌ ❌",
      error.message
    );
  }
})();

export class PaymentCache implements PaymentCacheDao {
  // ------------- cache plans ----------------
  async cachePlans(plans: Plan[]): Promise<void> {
    try {
      await client.connect();
      await client
        .set("plans", JSON.stringify(plans), "EX", 60 * 30 * 24)
        .then((value: any) => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          console.log(err);
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      console.log("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }

  // ------------- get plans from cache  ----------------
  async getCachedPlans(): Promise<any> {
    try {
      await client.connect();
      const plans = await client
        .get("plans")
        .then((value: any) => {
          return Promise.resolve(value);
        })
        .catch((err: any) => {
          console.log(err);
          return Promise.reject(err);
        });
      client.disconnect();
      return plans;
    } catch (error) {
      console.log("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }

  // ------------- update plan token in cache ----------------
  async updatePlanToken(user_id: string, user_plan: string): Promise<void> {
    try {
      await client.connect();
      await client
        .hSet(user_id, "user_plan", user_plan)
        .then(() => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      console.log("Error connecting to Redis ❌ ❌ ❌ ");
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
      console.log("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }
}

export const cache = new PaymentCache();
