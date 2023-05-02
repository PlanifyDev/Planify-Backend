import { accessEnv, logger } from "../helpers";
const env = accessEnv("ENV_CACHE").trim();
import { cache } from "../cache";

export const authByCache = async (req, res, next) => {
  const token = req.headers.authorization;

  const user_id = req.headers.user_id;
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

  res.locals.user_id = user_id;
  res.locals.verified = user.verified;
  return next();
};
