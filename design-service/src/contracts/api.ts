import * as type from "./types";

// =======================================================================================
// ----------------------- Project API -----------------------
// =======================================================================================

// ----------------- Create new Project --------------------------
export type CreateProjectReq = type.NewProjectReq;
export interface CreateProjectRes {
  project: type.projectRes;
}

// ----------------- Get All Projects Of User --------------------------

export interface GetProjectsReq {}
export interface GetProjectsRes {
  projects: type.projectRes[];
}

// ----------------- Get Copy Of An Old Project --------------------------
export interface CopyProjectParam {
  id: number;
}
export interface CopyProjectReq {
  user_id: number;
}
export interface CopyProjectRes {
  project: type.ProjectCopy;
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

// =======================================================================================
// ----------------------- Version API -----------------------
// =======================================================================================

// ----------------- Create new Version --------------------------
export interface CreateVersionReq {
  user_id: string;
  project_id: number;
}
export interface CreateVersionRes {
  version: type.Version;
}

// ----------------- Get versions of project --------------------------
export interface GetVersionsReq {
  user_id: string;
  project_id: number;
}
export interface GetVersionsRes {
  versions: type.Version[];
}

// ----------------- Get version by id --------------------------
export interface GetVersionByIdParam {
  id: number;
}
export interface GetVersionByIdReq {
  user_id: string;
}
export interface GetVersionByIdRes extends type.Version {}

// ----------------- Update Version Name --------------------------
export interface UpdateVersionNameParam {
  id: number;
}
export interface UpdateVersionNameReq {
  user_id: string;
  name: string;
}
export interface UpdateVersionNameRes {}

// ----------------- move Version to trash --------------------------
export interface MoveVersionToTrashParam {
  id: number;
}
export interface MoveVersionToTrashReq {
  user_id: string;
}
export interface MoveVersionToTrashRes {}

// ----------------- Restore Version from trash --------------------------
export interface RestoreVersionFromTrashParam {
  id: number;
}
export interface RestoreVersionFromTrashReq {
  user_id: string;
}
export interface RestoreVersionFromTrashRes {}

// ----------------- Delete version permanently --------------------------
export interface DeleteVersionParam {
  id: number;
}
export interface DeleteVersionReq {
  user_id: string;
}
export interface DeleteVersionRes {}
