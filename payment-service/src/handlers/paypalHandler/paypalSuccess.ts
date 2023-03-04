import paypal from "paypal-rest-sdk";
import * as api from "../../contracts/api";
import { myHandlerWithQuery, Payment } from "../../contracts/types";
import { dbPayment } from "../../datastore";
import { cache } from "../../cache";
import * as help from "../../helpers";
import * as grpc from "../../gRPC/auth_client/authClient";

export const success: myHandlerWithQuery<
  api.PaypalSuccessReq,
  api.PaypalSuccessRes,
  api.PaypalSuccessQuery
> = async (req, res, next) => {
  const payerId: string = req.query.PayerID as string;
  const paymentId: string = req.query.paymentId as string;

  let paymentDB: Payment;

  // ----------------- get payment from db -----------------
  await dbPayment
    .getPaymentPyId(paymentId)
    .then((payment) => {
      paymentDB = payment;
    })
    .catch((error) => {
      return next(new help.NewError(error.message, 500));
    });

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: paymentDB.currency,
          total: paymentDB.amount,
        },
      },
    ],
  };

  // ----------------- execute payment -----------------
  try {
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async (error, payment) => {
        if (error) {
          return next(new help.NewError(error.message, 400));
        } else {
          // ----------------- update payment after executed -----------------
          await dbPayment
            .updatePaymentStatus(
              paymentId,
              payment.state,
              payment.create_time,
              payerId
            )
            .catch((error) => {
              return next(new help.NewError(error.message, 400));
            });

          // ----------------- cerate token for plan -----------------------
          const expire = paymentDB.subscription == "monthly" ? "30d" : "365d";
          const plan_token = help.createToken(
            { plan_id: paymentDB.plan_id, user_id: paymentDB.user_id },
            expire
          );

          // ----------------- update plan on auth service using gRPC -----------------
          await grpc
            .update_plan(paymentDB.user_id, plan_token)
            .then((status) => {
              console.log(status);
            })
            .catch((error) => {
              return next(new help.NewError(error.message, 400));
            });

          // ----------------- update plan on cache -----------------
          cache
            .updatePlanToken(paymentDB.user_id, plan_token)
            .catch((error) => {
              return next(new help.NewError(error.message, 500));
            });

          return res.sendStatus(200);
        }
      }
    );
  } catch (error) {
    return next("Error");
  }
};
