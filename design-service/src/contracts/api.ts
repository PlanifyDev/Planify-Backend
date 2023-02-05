import { Project, NewProject, Version } from "./types";

// user API

// ----------- Create new Project ------------------------
export type CreateProjectReq = NewProject;
export interface CreateProjectRes extends Version {}

// ----------- Create new Version ------------------------
export interface CreateVersionReq {
  project_id: number;
}
export interface CreateVersionRes extends Version {}

// ----------------- Get All Projects --------------------------

export interface GetProjectsReq {
  user_id: string;
}

export interface GetProjectsRes {
  projects: Project[];
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

// ----------------- Delete project --------------------------
export interface DeleteProjectReq {
  project_id: number;
}

export interface DeleteProjectRes {}

// ----------------- Delete version --------------------------
export interface DeleteVersionReq {
  version_id: number;
}

export interface DeleteVersionRes {}
