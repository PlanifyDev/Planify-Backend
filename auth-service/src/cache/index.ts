import { createClient } from "redis";
import { accessEnv } from "../helpers";
import logger from "../services/loggerService";

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
    logger.info("Redis connected successfully ✅ ✅ ✅ ");
  } catch (error) {
    logger.error(
      "Error connecting to Redis ❌ ❌ ❌ ❌ ❌ ❌ ❌",
      error.message
    );
  }
})();

import { UserCacheData } from "../contracts/types";
import { userCacheDao } from "./userCacheDao";

export class UserCacheDao implements userCacheDao {
  // ------------- save user to cache (sign in) ----------------
  async cacheUser(user_id: string, cacheUser: UserCacheData): Promise<void> {
    try {
      await client.connect();
      await client
        .sendCommand([
          "hmset",
          user_id,
          "user_token",
          cacheUser.user_token,
          "firstname",
          cacheUser.firstname,
          "lastname",
          cacheUser.lastname,
          "email",
          cacheUser.email,
          "image_url",
          cacheUser.image_url,
          "user_plan",
          cacheUser.user_plan,
          "verified",
          cacheUser.verified.toString(),
          "role",
          cacheUser.role,
          "country",
          cacheUser.country,
        ])
        .then((value: any) => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          console.log(err);
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      logger.error("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }

  // ------------- add verification code to cache  ----------------
  async addVerificationCode(user_id: string, code: string): Promise<void> {
    try {
      await client.connect();
      await client
        .hSet(user_id, "verification_code", code)
        .then(() => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      logger.error("Error connecting to Redis ❌ ❌ ❌ ");
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
      logger.error("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }

  // ------------- get verification code from cache  ----------------
  async getVerificationCode(user_id: string): Promise<string> {
    try {
      await client.connect();
      const code = await client
        .hGet(user_id, "verification_code")
        .then((value: any) => {
          return Promise.resolve(value);
        })
        .catch((err: any) => {
          console.log(err);
          return Promise.reject(err);
        });
      client.disconnect();
      return code;
    } catch (error) {
      logger.error("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }

  // ------------- update verification status ----------------
  async updateVerificationCache(user_id: string, token: string): Promise<void> {
    try {
      await client.connect();
      await client
        .sendCommand([
          "hmset",
          user_id,
          "verified",
          "true",
          "user_token",
          token,
        ])
        .then((value: any) => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          console.log(err);
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      logger.error("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }

  // ------------- update user data in cache ----------------
  async updateUserDataCache(user_id: string, userCache: any): Promise<void> {
    try {
      await client.connect();
      await client
        .sendCommand([
          "hmset",
          user_id,
          "firstname",
          userCache.firstname,
          "lastname",
          userCache.lastname,
          "image_url",
          userCache.image_url,
          "role",
          userCache.role,
          "country",
          userCache.country,
        ])
        .then((value: any) => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          console.log(err);
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      logger.error("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }

  // ------------- update user image in cache ----------------
  async updateImageCache(user_id: string, image_url: string): Promise<void> {
    try {
      await client.connect();
      await client
        .sendCommand(["hmset", user_id, "image_url", image_url])
        .then(() => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      logger.error("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }

  // ------------- update user plan in cache ----------------
  async updatePlanCache(user_id: string, user_plan: string): Promise<void> {
    try {
      await client.connect();
      await client
        .sendCommand(["hmset", user_id, "user_plan", user_plan])
        .then(() => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      logger.error("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }

  // ------------- update user name in cache ----------------
  async updateNameCache(
    user_id: string,
    firstname: string,
    lastname: string
  ): Promise<void> {
    try {
      await client.connect();
      await client
        .sendCommand([
          "hmset",
          user_id,
          "firstname",
          firstname,
          "lastname",
          lastname,
        ])
        .then(() => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      logger.error("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }

  // ------------- delete verification code from cache  ----------------
  async deleteVerificationCode(user_id: string): Promise<void> {
    try {
      await client.connect();
      await client
        .hDel(user_id, "verification_code")
        .then(() => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      logger.error("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }

  // ------------- delete user from cache (sign out) ----------------
  async signOutCache(user_id: string): Promise<void> {
    try {
      await client.connect();
      await client
        .del(user_id)
        .then(() => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      logger.error("Error connecting to Redis ❌ ❌ ❌ ");
    }
  }
}

export const cache = new UserCacheDao();
