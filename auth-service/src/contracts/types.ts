import { RequestHandler } from "express";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  image_url: string;
  email: string;
  password: string;
}
export type UserDB = User & { verified: boolean };
type withError<T> = T & { error: string };
export type expressHandler<Param, ReqBody, ResBody> = RequestHandler<
  Partial<Param>,
  Partial<withError<ResBody>>,
  Partial<ReqBody>
>;

export interface jwtObject {
  userId: string;
}
