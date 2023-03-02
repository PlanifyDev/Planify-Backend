import { UserCacheData } from "../contracts/types";

export interface PaymentCacheDao {
  updatePlanToken(user_id: string, user_plan: string): Promise<void>;
  getCachedUser(user_id: string): Promise<UserCacheData>;
}
