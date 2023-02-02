import paypal from "paypal-rest-sdk";
import * as api from "../contracts/api";
import { myHandlerWithQuery, Payment } from "../contracts/types";
import { dbPayment, dbPlan } from "../datastore";
import { NewError } from "../helpers";

export const success: myHandlerWithQuery<
  api.PaypalSuccessReq,
  api.PaypalSuccessRes,
  api.PaypalSuccessQuery
> = async (req, res, next) => {
  const payerId: string = req.query.PayerID as string;
  const paymentId: string = req.query.paymentId as string;

  let paymentDB: Payment;

  await dbPayment
    .getPaymentPyId(paymentId)
    .then((payment) => {
      paymentDB = payment;
    })
    .catch((error) => {
      return next(new NewError(error.message, 500));
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

  try {
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async (error, payment) => {
        if (error) {
          return next(new NewError(error.message, 400));
        } else {
          // update payment after executed
          await dbPayment
            .updatePaymentStatus(
              paymentId,
              payment.state,
              payment.create_time,
              payerId
            )
            .catch((error) => {
              return next(new NewError(error.message, 400));
            });

          // return res.end();
          res.redirect("http://localhost:3001/test_pay");
          // return serndEmailFuc()
        }
      }
    );
  } catch (error) {
    return next("Error");
  }
};
