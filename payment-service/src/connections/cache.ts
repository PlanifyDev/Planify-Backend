import { createClient } from "redis";
import { accessEnv, logger } from "../helpers";

const url = accessEnv("REDIS_URL_LOCAL");

export class Redis {
  private REDIS;

  public constructor() {
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

  getClient(): any {
    return this.REDIS;
  }
}

export const REDIS = new Redis().getClient();
