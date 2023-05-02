import * as type from "../contracts/types";
import { REDIS } from "../connections";
import { logger, accessEnv } from "../helpers";
import { CacheDao } from "./cacheDao";
// ------------- get user from cache  ----------------
class CacheDaoImpl implements CacheDao {
  private static instance: CacheDaoImpl;
  private constructor() {}
  static getInstance(): CacheDaoImpl {
    if (!CacheDaoImpl.instance) {
      CacheDaoImpl.instance = new CacheDaoImpl();
    }
    return CacheDaoImpl.instance;
  }

  async getCachedUser(user_id: string): Promise<type.UserCacheData> {
    try {
      const user = await REDIS.hGetAll(user_id)
        .then((value: any) => {
          return Promise.resolve(value);
        })
        .catch((err: any) => {
          logger.error(
            "Redis Error: in by cache in get user func",
            err.message
          );
        });

      return user;
    } catch (error) {
      logger.error("Error connecting to Redis:", error.message);
    }
  }
}

export const cache: CacheDao = CacheDaoImpl.getInstance();
