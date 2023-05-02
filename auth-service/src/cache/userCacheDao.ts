import { UserCacheData } from "../contracts/types";

export interface userCacheDao {
  cacheUser(user_id: string, cacheUser: UserCacheData): Promise<void>;
  addVerificationCode(user_id: string, code: string): Promise<void>;

  getCachedUser(user_id: string): Promise<UserCacheData>;
  getVerificationCode(user_id: string): Promise<string>;

  updateUserDataCache(user_id: string, userCache: any): Promise<void>;

  updateVerificationCache(user_id: string, verified: string): Promise<void>;
  updateImageCache(user_id: string, image_url: string): Promise<void>;
  updatePlanCache(user_id: string, plan_token: string): Promise<void>;
  updateNameCache(
    user_id: string,
    firstname: string,
    lastname: string
  ): Promise<void>;

  deleteVerificationCode(user_id: string): Promise<void>;
  signOutCache(user_id: string): Promise<void>;
}
