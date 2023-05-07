import { RequestHandler } from "express";

// project data stored in DB
export interface Project {
  id: number;
  name: string;
  boundary: Object;
  door_position: Object;
  // neighbors: Object;
  area: string;
  project_img: string;
  project_icon: string;
  created_at: string;
  deleted: boolean;
  user_id: string;
}

// data from client to create new project
export type NewProjectReq = Pick<
  Project,
  "boundary" | "door_position" | "area" // neighbors is missing
>;

// data to insert to DB
export type CreateProjectDB = Omit<
  Project,
  "id" | "name" | "created_at" | "deleted"
>;

// data to return to client
export type projectRes = Omit<
  Project,
  "boundary" | "door_position" | "area" | "user_id"
>;

// data to copy from project to create new project like old project
export type ProjectCopy = Pick<
  Project,
  "boundary" | "door_position" | "area" // neighbors is missing
>;

// version data store in DB
export interface Version {
  id: number;
  name: string;
  version_img: string;
  version_icon: string;
  constraints: Object;
  created_at: string;
  deleted: boolean;
  project_id: number;
}

// version data to insert to DB
export type CreateVersionDB = Omit<
  Version,
  "id" | "name" | "created_at" | "deleted"
>;

export interface AiProjectResponse {
  project_img: string;
  project_icon: string;
}

export interface AiVersionResponse {
  version_img: string;
  version_icon: string;
}

// data of user that i need to check auth
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
