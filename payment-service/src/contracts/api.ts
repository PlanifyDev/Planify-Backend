import * as type from "./types";

// ================================== invoice api ==================================
// --------------  Create Invoice --------------
export interface createInvoiceReq {
  user_id: string;
  plan_id: string;
  subscription: "monthly" | "yearly";
}
export interface createInvoiceRes {
  redirect_url: string;
}

// -------------- Get All invoices --------------
export interface getAllInvoiceReq {
  user_id: string;
}
export interface getAllInvoicesRes {
  invoices: type.Payment[];
}

// -------------- Get Invoice --------------
export interface getInvoiceParam {
  payment_id: string;
}
export interface getInvoiceReq {
  user_id: string;
}
export interface getInvoiceRes {
  invoice: type.Payment;
}

// -------------- Delete Invoice --------------
export interface deleteInvoiceParam {
  payment_id: string;
}
export interface deleteInvoiceReq {
  user_id: string;
}

export interface deleteInvoiceRes {}

// ================================== paypal api ==================================
export interface PaypalSuccessReq {}
export interface PaypalSuccessQuery {
  paymentId: string;
  PayerID: string;
}
export interface PaypalSuccessRes {}

export interface PaypalCancelReq {}
export interface PaypalCancelQuery {
  token: string;
}
export interface PaypalCancelRes {}

// ================================== plan api ==================================
// -------------- Get All plans --------------
export interface getAllPlansReq {}
export interface getAllPlansRes {
  plans: type.Plan[];
}

// -------------- Get plan --------------
export interface getPlanParam {
  plan_id: string;
}
export interface getPlanReq {}
export interface getPlanRes {
  plan: type.Plan;
}
