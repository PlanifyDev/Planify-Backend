import * as api from "../../contracts/api";
import { dbPlan } from "../../datastore";
import { NewError } from "../../helpers";
import * as type from "../../contracts/types";
import { cache } from "../../cache";
// ------------------ Get all invoices --------------------
export const getAllPlans: type.myHandler<
  api.getAllPlansReq,
  api.getAllPlansRes
> = async (req, res, next) => {
  let plans: type.Plan[];

  // get plans from cache
  const cachedPlans = await cache.getCachedPlans().then((data) => data);
  if (cachedPlans) {
    plans = cachedPlans;
    return res.status(200).json({ plans });
  } else {
    // get plans from db
    await await dbPlan
      .geyAllPlans()
      .then((data) => {
        plans = data;
      })
      .catch((error) => {
        return next(new NewError(error.message, 500));
      });

    // cache plans
    await cache.cachePlans(plans).catch((error) => {
      return next(new NewError(error.message, 500));
    });

    return res.status(200).json({ plans });
  }
};

// ------------------ Get single invoice --------------------
export const getPlan: type.myHandlerWithParam<
  api.getPlanParam,
  api.getPlanReq,
  api.getPlanRes
> = async (req, res, next) => {
  const { plan_id } = req.params;
  let plan: type.Plan;
  await dbPlan
    .getPlan(plan_id)
    .then((data) => {
      plan = data;
    })
    .catch((error) => {
      return next(new NewError(error.message, 500));
    });
  res.status(200).json({ plan });
};
