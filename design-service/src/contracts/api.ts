import { Project, NewProjectReq, projectRes, Version } from "./types";

// ===========================================================
// ----------------------- Project API -----------------------
// ===========================================================

// ----------------- Create new Project --------------------------
export type CreateProjectReq = NewProjectReq;
export interface CreateProjectRes {
  project: projectRes;
  version: Version;
}

// ----------------- Get All Projects Of User --------------------------

export interface GetProjectsReq {}
export interface GetProjectsRes {
  projects: projectRes[];
}

// ----------------- Update Project Name --------------------------
export interface UpdateProjectNameParam {
  id: number;
}
export interface UpdateProjectNameReq {
  name: string;
  user_id: number;
}
export interface UpdateProjectNameRes {}

// ----------------- Move Project to trash --------------------------
export interface MoveProjectToTrashParam {
  id: number;
}
export interface MoveProjectToTrashReq {
  user_id: string;
}
export interface MoveProjectToTrashRes {}

// ----------------- Restore Project from trash --------------------------
export interface RestoreProjectFromTrashParam {
  id: number;
}
export interface RestoreProjectFromTrashReq {
  user_id: number;
}
export interface RestoreProjectFromTrashRes {}

// ----------------- Delete project permanently --------------------------
export interface DeleteProjectParam {
  id: number;
}
export interface DeleteProjectReq {
  user_id: number;
}
export interface DeleteProjectRes {}

// ===========================================================
// ----------------------- Version API -----------------------
// ===========================================================

// ----------------- Create new Version --------------------------
export interface CreateVersionReq {
  project_id: number;
}
export interface CreateVersionRes extends Version {}

// ----------------- Get versions of project --------------------------
export interface GetVersionsReq {
  project_id: number;
}
export interface GetVersionsRes {
  versions: Version[];
}

// ----------------- Update Version Name --------------------------
export interface UpdateVersionNameReq {
  version_id: number;
  name: string;
}
export interface UpdateVersionNameRes {}

// ----------------- move Version to trash --------------------------
export interface MoveVersionToTrashReq {
  version_id: number;
}
export interface MoveVersionToTrashRes {}

// ----------------- Restore Version from trash --------------------------
export interface RestoreVersionFromTrashReq {
  version_id: number;
}
export interface RestoreVersionFromTrashRes {}

// ----------------- Delete version permanently --------------------------
export interface DeleteVersionReq {
  version_id: number;
}
export interface DeleteVersionRes {}
