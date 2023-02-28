import * as type from "./types";

// user API

// ----------- Sign up api ------------------------
export type SignUpReq = type.UserRegister;

export interface SignupRes {
  user: type.UserRes;
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

// ------------------ Send Verification Email ---------------------

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
export interface SignInRes {
  user: type.UserRes;
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
export interface DeleteUserReq {}
export interface DeleteUserRes {}

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

// ----------------- Get User Data ------------------------------
export interface GetUserDataParam {
  id: string;
}
export interface GetUserDataReq {}
export interface GetUserDataRes {
  user: type.UserCacheData;
}
