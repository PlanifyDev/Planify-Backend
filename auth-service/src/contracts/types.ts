import { RequestHandler } from "express";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

type withError<T> = T & { error: string };
export type expressHandler<Req, Res> = RequestHandler<
  string,
  Partial<withError<Res>>,
  Partial<Req>
>;

export interface jwtObject {
  userId: string;
}
