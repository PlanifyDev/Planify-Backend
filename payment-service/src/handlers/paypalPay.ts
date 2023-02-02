import paypal from "paypal-rest-sdk";
import { myHandler } from "../contracts/types";
import * as api from "../contracts/api";
import { Payment } from "../contracts/types";
import { create_payment_json } from "../helpers";
import { dbPayment, dbPlan } from "../datastore";
import { NewError } from "../helpers";
export const pay: myHandler<api.PaypalReq, api.PaypalRes> = async (
  req,
  res,
  next
) => {
  const plan_id = req.body.plan_id;
  const subscription = req.body.subscription;

  let totalAmount: number;
  let payment_description: string;

  const plan = await dbPlan.getPlan(plan_id);
  if (!plan) {
    return next(new NewError("Plan Not Found", 404));
  }
  if (subscription == "monthly") {
    totalAmount = plan.monthly_price;
    payment_description = `Subscription in ${plan.name} plan for one month`;
  } else if (subscription == "yearly") {
    totalAmount = plan.yearly_price;
    payment_description = `Subscription in ${plan.name} plan for one year`;
  } else {
    return next(new NewError("Subscription Not Found", 404));
  }

  // create details of invoice
  const invoiceObj = create_payment_json(totalAmount, payment_description);

  // create invoice and return approval_url
  paypal.payment.create(invoiceObj, async function (error, payment) {
    if (error) {
      return next(new NewError(error.message, 400));
    } else {
      // const created_date = new Date(payment.create_time).toLocaleDateString();
      // const created_date = payment.create_time;
      const paymentDB_obj: Payment = {
        payment_id: payment.id,
        payment_description,
        amount: totalAmount,
        currency: "USD",
        created_date: payment.create_time,
        payment_details: payment,
        payment_status: payment.state,
        user_id: res.locals.user_id,
        plan_id,
        subscription,
        payer_id: null,
      };

      await dbPayment.createPayment(paymentDB_obj).catch((error) => {
        return next(new NewError(error.message, 500));
      });

      const redirect_url = payment.links.filter(
        (data) => data.rel == "approval_url"
      )[0].href;

      return res.status(200).send({ redirect_url });
    }
  });
};
