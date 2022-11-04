import { User } from "./types";

// user API

// ------------------------------------------------
export type SignUpReq = Pick<
  User,
  "firstname" | "lastname" | "image_url" | "email" | "password"
>;

export interface SignupRes {
  jwt: string;
}

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

export interface GetUserParam {
  user_id: string;
}
export type GetUserReq = Record<string, never>;

export interface GetUserRes {
  user: Pick<User, "firstname" | "lastname" | "image_url" | "email" | "id">;
}

// ------------------------------------------------

export interface UpdatePassReq {
  user_id: string;
  password: string;
}
export interface UpdatePassRes {
  jwt: string;
}

// ------------------------------------------------

export interface UpdateNameReq {
  user_id: string;
  firstname: string;
  lastname: string;
}
export interface UpdateNameRes {
  jwt: string;
}

// ------------------------------------------------

export interface UpdateImgReq {
  user_id: string;
  image_url: string;
}
export interface UpdateImgRes {
  jwt: string;
}

// ------------------------------------------------

export type SetVerifyReq = Record<string, never>;
export interface SetVerifyRes {
  jwt: string;
}

// ------------------------------------------------

export interface DeleteUserReq {
  id: string;
}
export interface DeleteUserRes {
  message: string;
}
// ------------------------------------------------
