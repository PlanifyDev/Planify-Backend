import {
  Project,
  NewProject,
  Version,
  NewVersion,
} from "../../contracts/types";

export interface projectDao {
  createProject(newProject: NewProject): Promise<void>;

  createVersion(newVersion: NewVersion): Promise<void>;

  getProjects(user_id: string): Promise<Project[]>;

  getVersions(project_id: number): Promise<Version[]>;

  updateProjectName(project_id: number, name: string): Promise<void>;

  updateVersionName(version_id: number, name: string): Promise<void>;

  moveProjectToTrash(project_id: number): Promise<void>;

  moveVersionToTrash(version_id: number): Promise<void>;

  restoreProjectFromTrash(project_id: number): Promise<void>;

  restoreVersionFromTrash(version_id: number): Promise<void>;

  deleteProject(project_id: number): Promise<void>;

  deleteVersion(version_id: number): Promise<void>;
}
