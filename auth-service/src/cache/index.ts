import { createClient } from "redis";

import { accessEnv } from "../helpers";
const env = accessEnv("ENV");

let client;
if (env === "prod") {
  client = createClient(accessEnv("REDIS_URL"));
} else {
  client = createClient();
}

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
          "username",
          cacheUser.username,
          "plan_token",
          cacheUser.plan_token,
          "verified",
          cacheUser.verified,
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
      console.error("Error connecting to Redis:", error);
      process.exit(1);
    }
  }

  // ------------- update verification status ----------------
  async updateVerificationCache(
    user_id: string,
    verified: string
  ): Promise<void> {
    try {
      await client.connect();
      await client
        .hSet(user_id, "verified", verified)
        .then((value: any) => {
          return Promise.resolve();
        })
        .catch((err: any) => {
          console.log(err);
          return Promise.reject(err);
        });
      client.disconnect();
    } catch (error) {
      console.error("Error connecting to Redis:", error);
      process.exit(1);
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
      console.error("Error connecting to Redis:", error);
      process.exit(1);
    }
  }

  // ------------- update user name in cache ----------------
  async updateNameCache(user_id: string, username: string): Promise<void> {
    try {
      await client.connect();
      await client
        .hSet(user_id, "username", username)
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

export const cache = new UserCacheDao();
