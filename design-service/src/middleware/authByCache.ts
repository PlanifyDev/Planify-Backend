import * as type from "../contracts/types";
import { createClient } from "redis";
import { accessEnv } from "../helpers/accessEnv";
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

export const authByCache = async (req, res, next) => {
  const token = req.headers.authorization;

  const user_id = req.body.user_id;
  if (!token) {
    return res.status(401).send({ error: "Bad token" });
  }
  const user = await getCachedUser(user_id);
  if (!Object.keys(user).length) {
    return res.status(401).send({ error: "User not found" });
  }

  if (user.user_token !== token) {
    return res.status(401).send({ error: "Bad token" });
  }

  res.locals.userId = user_id;
  res.locals.verified = user.verified;
  return next();
};

// ------------- get user from cache  ----------------
const getCachedUser = async (user_id: string): Promise<type.UserCacheData> => {
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
};
