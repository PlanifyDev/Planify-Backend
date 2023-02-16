import { User } from "./types";

// user API

// ----------- Sign up api ------------------------
export type SignUpReq = Pick<
  User,
  "firstname" | "lastname" | "email" | "password"
>;

export interface SignupRes {
  jwt: string;
}
// ----------------- Verify -------------------------------

export interface Verify {}

// ------------------ Send Email ------------------------------

export interface SendEmailReq {}
export interface SendEmailRes {}

// ------------------ Sign In  -----------------------------

export interface SignInReq {
  email: string;
  password: string;
}
export interface SigninRes {
  user: Pick<User, "id" | "firstname" | "lastname" | "image_url" | "email">;
  jwt: string;
}

// ------------------ Sign Out  -----------------------------

export interface SignOutParam {
  id: string;
}
export interface SignOutReq {}
export interface SignOutRes {}

// ------------------Update Image ---------------------------

export interface UpdateImgParam {
  user_id: string;
}
export interface UpdateImgReq {}
export interface UpdateImgRes {
  image_url: string;
}

// --------------- Set Verification ---------------------------------

export type SetVerifyReq = Record<string, never>;
export interface SetVerifyRes {}

// ----------------- Delete User ------------------------------

export interface DeleteUserParam {
  user_id: string;
}
export type DeleteUserReq = Record<string, never>;
export interface DeleteUserRes {
  message: string;
}
// ------------------ Update All Data --------------------------

export interface UpdateAllParam {
  user_id: string;
}
export interface UpdateAllReq {
  firstname?: string;
  lastname?: string;
  password?: string;
  oldPassword?: string;
}
export interface UpdateAllRes {}

// --------------- Forget Password---------------------------------

export interface ForgetPassReq {
  email: string;
}
export interface ForgetPassRes {}

// ---------------- Reset Password --------------------------------

export interface ResetPassReq {
  newpassword: string;
}
export interface ResetPassRes {}
