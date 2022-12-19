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
