import { User } from "./types";

// user API

// ------------------------------------------------
export type SignUpReq = Pick<
  User,
  "firstname" | "lastname" | "image_url" | "email" | "password"
>;

export interface SignupRes {}

// ------------------------------------------------

export interface Verify {}

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

export interface UpdatePassParam {
  user_id: string;
}
export interface UpdatePassReq {
  password: string;
}
export type UpdatePassRes = Record<string, never>;

// ------------------------------------------------
export interface UpdateNameParam {
  user_id: string;
}
export interface UpdateNameReq {
  firstname: string;
  lastname: string;
}
export type UpdateNameRes = Record<string, never>;

// ------------------------------------------------

export interface UpdateImgParam {
  user_id: string;
}
export interface UpdateImgReq {
  image_url: string;
}
export type UpdateImgRes = Record<string, never>;

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
  image_url?: string;
  password?: string;
}
export type UpdateAllRes = Record<string, never>;
