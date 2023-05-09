import { Plan, UserCacheData } from "../contracts/types";
import { PaymentCacheDao } from "./PaymentCacheDao";
import { logger, accessEnv } from "../helpers";
import { REDIS } from "../connections";

export class PaymentCache implements PaymentCacheDao {
  // ------------- Singleton ----------------
  private static instance: PaymentCache;
  private constructor() {}
  public static getInstance(): PaymentCache {
    if (!PaymentCache.instance) {
      PaymentCache.instance = new PaymentCache();
    }
    return PaymentCache.instance;
  }

  // ------------- cache plans ----------------
  async cachePlans(plans: Plan[]): Promise<void> {
    try {
      await REDIS.set("plans", JSON.stringify(plans), "EX", 60 * 30 * 24)
        .then((value: any) => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          console.log(err);
          return Promise.reject(err);
        });
    } catch (error) {
      logger.error("Error connecting to Redis:", error.message);
    }
  }

  // ------------- get plans from cache  ----------------
  async getCachedPlans(): Promise<any> {
    try {
      const plans = await REDIS.get("plans")
        .then((value: any) => {
          return Promise.resolve(value);
        })
        .catch((err: any) => {
          console.log(err);
          return Promise.reject(err);
        });
      return plans;
    } catch (error) {
      logger.error("Error connecting to Redis:", error.message);
    }
  }

  // ------------- update plan token in cache ----------------
  async updatePlanToken(user_id: string, user_plan: string): Promise<void> {
    try {
      await REDIS.hSet(user_id, "user_plan", user_plan)
        .then(() => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          return Promise.reject(err);
        });
    } catch (error) {
      logger.error("Error connecting to Redis:", error.message);
    }
  }

  // ------------- get user from cache  ----------------
  async getCachedUser(user_id: string): Promise<UserCacheData> {
    try {
      const user = await REDIS.hGetAll(user_id);
      return Promise.resolve(user);
    } catch (error) {
      logger.error("Error connecting to Redis:", error.message);
      return Promise.reject(error);
    }
  }
}

export const cache: PaymentCacheDao = PaymentCache.getInstance();
