// export type SignUpReq = Pick<
//   User,
//   "firstname" | "lastname" | "email" | "password"
// >;

// ------------------------------------------------

export interface PaypalReq {
  plan_id: string;
  subscription: "monthly" | "yearly";
}
export interface PaypalRes {
  redirect_url: string;
}

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
