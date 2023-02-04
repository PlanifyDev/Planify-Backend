import { UserCacheData } from "../contracts/types";

export interface userCacheDao {
  cacheUser(user_id: string, cacheUser: UserCacheData): Promise<void>;
  updateVerificationCache(user_id: string, verified: string): Promise<void>;
  signOutCache(user_id: string): Promise<void>;
  updateNameCache(user_id: string, username: string): Promise<void>;
  getCachedUser(user_id: string): Promise<UserCacheData>;
}
