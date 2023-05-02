import { createClient } from "redis";
import { accessEnv, logger } from "../helpers";

const url = accessEnv("REDIS_URL_LOCAL");

export class Redis {
  private static instance: Redis;
  private REDIS;

  private constructor() {
    this.REDIS = createClient({ url: url });

    (async () => {
      try {
        await this.REDIS.connect();
        logger.info("Redis connected successfully ✅ ✅ ✅ ");
      } catch (error) {
        logger.error("Error connecting to Redis ❌ ❌ ❌ ", error.message);
      }
    })();
  }

  static getInstance(): Redis {
    if (!Redis.instance) {
      Redis.instance = new Redis();
    }
    return Redis.instance;
  }

  getClient(): any {
    return this.REDIS;
  }
}

export const REDIS = Redis.getInstance().getClient();
