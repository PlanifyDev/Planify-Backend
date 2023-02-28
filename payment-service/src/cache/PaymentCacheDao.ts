import { UserCacheData } from "../contracts/types";

export interface PaymentCacheDao {
  updatePlanToken(user_id: string, plan_token: string): Promise<void>;
  getCachedUser(user_id: string): Promise<UserCacheData>;
}
