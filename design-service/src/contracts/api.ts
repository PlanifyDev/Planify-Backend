import { Project, NewProjectReq, projectInRes, Version } from "./types";

// user API

// ----------------- Create new Project --------------------------
export type CreateProjectReq = NewProjectReq;
export interface CreateProjectRes {
  project: projectInRes;
  version: Version;
}

// ----------------- Create new Version --------------------------
export interface CreateVersionReq {
  project_id: number;
}
export interface CreateVersionRes extends Version {}

// ----------------- Get All Projects Of User --------------------------

export interface GetProjectsReq {}

export interface GetProjectsRes {
  projects: projectInRes[];
}

// ----------------- Get versions of project --------------------------
export interface GetVersionsReq {
  project_id: number;
}

export interface GetVersionsRes {
  versions: Version[];
}

// ----------------- Update Project Name --------------------------
export interface UpdateProjectNameReq {
  project_id: number;
  name: string;
}
export interface UpdateProjectNameRes {}

// ----------------- Update Version Name --------------------------
export interface UpdateVersionNameReq {
  version_id: number;
  name: string;
}

export interface UpdateVersionNameRes {}

// ----------------- Move Project to trash --------------------------
export interface MoveProjectToTrashReq {
  project_id: number;
}

export interface MoveProjectToTrashRes {}

// ----------------- move Version to trash --------------------------
export interface MoveVersionToTrashReq {
  version_id: number;
}

export interface MoveVersionToTrashRes {}

// ----------------- Restore Project from trash --------------------------
export interface RestoreProjectFromTrashReq {
  project_id: number;
}

export interface RestoreProjectFromTrashRes {}

// ----------------- Restore Version from trash --------------------------
export interface RestoreVersionFromTrashReq {
  version_id: number;
}

export interface RestoreVersionFromTrashRes {}

// ----------------- Delete project permanently --------------------------
export interface DeleteProjectReq {
  project_id: number;
}

export interface DeleteProjectRes {}

// ----------------- Delete version permanently --------------------------
export interface DeleteVersionReq {
  version_id: number;
}

export interface DeleteVersionRes {}
