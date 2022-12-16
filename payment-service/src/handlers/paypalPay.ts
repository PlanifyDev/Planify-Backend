import paypal from "paypal-rest-sdk";
import { myHandler } from "../contracts/types";
import * as api from "../contracts/api";
import { Payment } from "../contracts/types";
import { accessEnv } from "../helpers";
import { dbPayment, dbPlan } from "../datastore";
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
    return res.status(404).send({ error: "Plan Not Found" });
  }
  if (subscription == "monthly") {
    totalAmount = plan.monthly_price;
    payment_description = `Subscription in ${plan.name} plan for one month`;
  } else if (subscription == "yearly") {
    totalAmount = plan.yearly_price;
    payment_description = `Subscription in ${plan.name} plan for one year`;
  } else {
    return res.status(404).send({ error: "Subscription Not Found" });
  }

  // create details of invoice
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: accessEnv("RETURN_URL"),
      cancel_url: accessEnv("CANCEL_URL"),
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: totalAmount.toString(),
        },
        description: payment_description,
      },
    ],
  };

  // create invoice and return approval_url
  paypal.payment.create(create_payment_json, async function (error, payment) {
    if (error) {
      return res.status(400).send({ error: error.message });
    } else {
      const created_data = new Date(payment.create_time).toLocaleDateString();

      console.log({ payment });
      const paymentDB_obj: Payment = {
        payment_id: payment.id,
        payment_description,
        amount: totalAmount,
        currency: "USD",
        created_data,
        payment_details: payment,
        payment_status: payment.state,
        user_id: res.locals.user_id || "370baf2b-da16-4539-8eab-5f0be8ef4d8e",
        plan_id,
        subscription,
      };

      // save payment in database
      try {
        await dbPayment.createPayment(paymentDB_obj);
      } catch (error) {
        return next(error);
      }

      const redirect_url = payment.links.filter(
        (data) => data.rel == "approval_url"
      )[0].href;

      return res.status(200).send({ redirect_url });
    }
  });
};
