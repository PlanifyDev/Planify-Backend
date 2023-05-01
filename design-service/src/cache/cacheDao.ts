import * as type from "../contracts/types";
export interface CacheDao {
  getCachedUser(user_id: string): Promise<type.UserCacheData>;
}
