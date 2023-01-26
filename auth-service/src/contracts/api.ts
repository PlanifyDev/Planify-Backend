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
// ------------------------------------------------

export interface Verify {}

// ------------------------------------------------

export interface SendEmail {}

// ------------------------------------------------

export interface SignInReq {
  email: string;
  password: string;
}
export interface SigninRes {
  user: Pick<User, "id" | "firstname" | "lastname" | "image_url" | "email">;
  jwt: string;
}

// ------------------------------------------------
export interface UpdateImgParam {
  user_id: string;
}
export interface UpdateImgReq {}
export interface UpdateImgRes {
  image_url: string;
}

// ------------------------------------------------

export type SetVerifyReq = Record<string, never>;
export interface SetVerifyRes {}

// ------------------------------------------------

export interface DeleteUserParam {
  user_id: string;
}
export type DeleteUserReq = Record<string, never>;
export interface DeleteUserRes {
  message: string;
}
// ------------------------------------------------

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
