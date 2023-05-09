import { cache } from "../cache";

export const authByCache = async (req, res, next) => {
  const token = req.headers.authorization;
  const user_id = req.headers.id;

  if (!token) {
    return res.status(401).send({ error: "Bad token" });
  }

  if (!user_id) {
    return res.status(401).send({ error: "user_id is missing" });
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
