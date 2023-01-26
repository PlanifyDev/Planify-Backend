import { Plan } from "../../contracts/types";

export interface PlanDao {
  createPlan(plan: Plan): Promise<void>;

  getPlan(plan_id: string): Promise<Plan | undefined>;

  geyAllPlans(): Promise<Plan[] | undefined>;

  updatePlan(plan_id: string, newPlan: Plan): Promise<void>;

  deletePlan(plan_id: string): Promise<void>;
}
