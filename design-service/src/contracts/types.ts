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

export type NewProjectReq = Pick<Project, "name" | "boundary" | "user_id">;

// todo add door_position, neighbors, constraints
export type NewProjectDB = Pick<
  Project,
  "name" | "boundary" | "project_img" | "project_icon" | "user_id"
>;

export type projectInRes = Pick<
  Project,
  "id" | "name" | "project_img" | "project_icon" | "created_at" | "deleted"
>;

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
export type NewVersion = Pick<
  Version,
  "version_num" | "name" | "version_img" | "version_icon" | "project_id"
>;

export interface UserCacheData {
  username: string;
  verified: string;
  plan_token: string;
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
