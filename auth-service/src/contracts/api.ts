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

export interface VerifyParam {
  id: string;
}
export interface VerifyReq {
  verificationCode: string;
}
export interface VerifyRes {
  jwt: string;
}

// ------------------ Send Email ------------------------------

export interface resendVerificationParam {
  id: string;
}
export interface resendVerificationReq {}
export interface resendVerificationRes {}

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
  id: string;
}
export interface UpdateImgReq {}
export interface UpdateImgRes {
  image_url: string;
}

// ----------------- Delete User ------------------------------

export interface DeleteUserParam {
  id: string;
}
export type DeleteUserReq = Record<string, never>;
export interface DeleteUserRes {
  message: string;
}
// ------------------ Update All Data --------------------------

export interface UpdateAllParam {
  id: string;
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
