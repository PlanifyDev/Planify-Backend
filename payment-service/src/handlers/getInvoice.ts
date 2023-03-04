import * as api from "../contracts/api";
import { dbPayment } from "../datastore";
import { NewError } from "../helpers";
import * as type from "../contracts/types";

// ------------------ Get all invoices --------------------
export const getAllInvoices: type.myHandler<
  api.getAllInvoiceReq,
  api.getAllInvoicesRes
> = async (req, res, next) => {
  const user_id = res.locals.user_id;
  let invoices: type.Payment[];
  await dbPayment
    .getAllPayments(user_id)
    .then((data) => {
      invoices = data;
    })
    .catch((error) => {
      return next(new NewError(error.message, 500));
    });
  res.status(200).json({ invoices });
};

// ------------------ Get single invoice --------------------
export const getInvoice: type.myHandlerWithParam<
  api.getInvoiceParam,
  api.getInvoiceReq,
  api.getInvoiceRes
> = async (req, res, next) => {
  const { payment_id } = req.params;
  let invoice: type.Payment;
  await dbPayment
    .getPaymentPyId(payment_id)
    .then((data) => {
      invoice = data;
    })
    .catch((error) => {
      return next(new NewError(error.message, 500));
    });
  res.status(200).json({ invoice });
};

// ------------------ Delete invoice --------------------
export const deleteInvoice: type.myHandlerWithParam<
  api.deleteInvoiceParam,
  api.deleteInvoiceReq,
  api.deleteInvoiceRes
> = async (req, res, next) => {
  const { payment_id } = req.params;

  await dbPayment.deletePayment(payment_id).catch((error) => {
    return next(new NewError(error.message, 500));
  });
  res.sendStatus(200);
};
