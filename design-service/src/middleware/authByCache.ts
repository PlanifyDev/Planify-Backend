import * as type from "../contracts/types";
import { createClient } from "redis";
import { accessEnv, logger } from "../helpers";
const env = accessEnv("ENV_CACHE").trim();
import { cache } from "../cache";

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
    client.disconnect();
  } catch (error) {
    logger.error(
      "Error connecting to Redis ❌ ❌ ❌ ❌ ❌ ❌ ❌",
      error.message
    );
  }
})();

export const authByCache = async (req, res, next) => {
  const token = req.headers.authorization;

  const user_id = req.body.user_id;
  if (!user_id) {
    res.status(401).send({ error: "User ID is missing" });
    return next("User ID is missing");
  }

  if (!token) {
    res.status(401).send({ error: "Bad token" });
    return next("Bad token");
  }
  const user = await cache.getCachedUser(user_id);
  if (!Object.keys(user).length) {
    res.status(401).send({ error: "User not found" });
    return next("User not found");
  }

  if (user.user_token !== token) {
    res.status(401).send({ error: "Bad token" });
    return next("Bad token");
  }

  res.locals.userId = user_id;
  res.locals.verified = user.verified;
  return next();
};
