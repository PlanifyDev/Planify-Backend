import { RequestHandler } from "express";

export interface Plan {
  id: string;
  name: string;
  description: string;
  designs: number;
  suggestions: number;
  dwg_file: boolean;
  design_3D: boolean;
  edit_design: boolean;
  monthly_price: number;
  early_price: number;
}

export interface Payment {
  payment_id: string;
  amount: number;
  created_time: Date;
  payment_details: Object;
  payment_status: string;
  user_id: string;
  plan_id: string;
}

type withError<T> = T & { error: string };
export type myHandler<ReqBody, ResBody> = RequestHandler<
  never,
  Partial<withError<ResBody>>,
  Partial<ReqBody>
>;

export type myHandlerWithParam<Param, ReqBody, ResBody> = RequestHandler<
  Partial<Param>,
  Partial<withError<ResBody>>,
  Partial<ReqBody>
>;

export type myHandlerWithQuery<ReqBody, ResBody, query> = RequestHandler<
  never,
  Partial<withError<ResBody>>,
  Partial<ReqBody>,
  Partial<query>
>;
export interface JwtPayload {}
