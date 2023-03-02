import * as type from "../contracts/types";
import { createClient } from "redis";
import { accessEnv } from "../helpers";
import { cache } from "../cache";
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

  const user_id = req.params.id;
  if (!token) {
    return res.status(401).send({ error: "Bad token" });
  }

  const user = await cache.getCachedUser(user_id);
  if (!Object.keys(user).length) {
    return res.status(401).send({ error: "User not found" });
  }

  if (user.user_token !== token) {
    return res.status(401).send({ error: "Bad token" });
  }

  if (user.verified == "false") {
    return res.status(401).send({ error: "User not verified" });
  }

  res.locals.user_id = user_id;

  return next();
};
