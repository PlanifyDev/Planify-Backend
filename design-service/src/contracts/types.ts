import { RequestHandler } from "express";

export interface Project {
  id: number;
  name: string;
  boundary: Object;
  // door_position: Object;
  // neighbors: Object;
  // constraints: Object;
  project_img: string;
  project_icon: string;
  created_at: string;
  deleted: boolean;
  user_id: string;
}

export type NewProjectReq = Pick<Project, "name" | "boundary" | "user_id">; // door_position, neighbors, constraints

export type CreateProjectDB = Omit<Project, "id" | "created_at" | "deleted">;

export type projectRes = Omit<Project, "boundary" | "user_id">;

export interface Version {
  id: number;
  version_num: number;
  name: string;
  version_img: string;
  version_icon: string;
  created_at: string;
  deleted: boolean;
  project_id: number;
}
export type CreateVersionDB = Omit<Version, "id" | "created_at" | "deleted">;

export interface AiResponse {
  project_img: string;
  project_icon: string;
  version_img: string;
  version_icon: string;
}

export interface UserCacheData {
  id: string;
  verified: boolean;
  user_token: string;
}

type withError<T> = T & { error: string };
export type myHandler<ReqBody, ResBody> = RequestHandler<
  string,
  Partial<withError<ResBody>>,
  ReqBody
>;
export type myHandlerWithParam<Param, ReqBody, ResBody> = RequestHandler<
  Partial<Param>,
  Partial<withError<ResBody>>,
  Partial<ReqBody>
>;

export interface JwtPayload {
  userId: string;
  verified: boolean;
}
