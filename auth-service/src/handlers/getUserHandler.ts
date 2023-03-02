import { DB } from "../datastore";
import * as type from "../contracts/types";
import * as api from "../contracts/api";
import { cache } from "../cache";

// ----------------- get user handler ------------------------------
export const getUserHandler: type.myHandlerWithParam<
  api.GetUserDataParam,
  api.GetUserDataReq,
  api.GetUserDataRes
> = async (req, res, next) => {
  const userId = req.params.id;
  let user: type.UserCacheData;
  try {
    // get user from cache
    user = await cache.getCachedUser(userId);
  } catch (error) {
    return next(error);
  }
  return res.status(200).send({ user });
};
