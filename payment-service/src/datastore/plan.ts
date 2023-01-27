import conn from "../connection";
import { PlanDao } from "./dao/planDao";
import { Plan } from "../contracts/types";
import { planQuery } from "./query";
export class PlanDataStore implements PlanDao {
  async createPlan(plan: Plan): Promise<void> {
    const newPlan: string[] = [];
    for (const key in plan) {
      newPlan.push(plan[key]);
    }
    try {
      await conn.query(planQuery.createPlan, newPlan);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getPlan(plan_id: string): Promise<Plan> {
    try {
      const plan = await conn.query(planQuery.getPlan, [plan_id]);
      return Promise.resolve(plan.rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async geyAllPlans(): Promise<Plan[]> {
    try {
      const allPlans = await conn.query(planQuery.geyAllPlans);
      return Promise.resolve(allPlans.rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updatePlan(plan_id: string, newPlan: Plan): Promise<void> {
    const newPlanList: string[] = [];
    for (const key in newPlan) {
      newPlanList.push(newPlan[key]);
    }
    try {
      await conn.query(planQuery.createPlan, newPlanList);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deletePlan(plan_id: string): Promise<void> {
    try {
      await conn.query(planQuery.deletePlan, [plan_id]);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const dbPlan = new PlanDataStore();
