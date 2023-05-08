import * as type from "../../contracts/types";

export interface ProjectDao {
  createProject(
    newProject: type.CreateProjectDB
  ): Promise<{ id: number; name: string }>;

  getProject(project_id: number): Promise<type.Project>;

  getProjectCopy(project_id: number): Promise<type.ProjectCopy>;

  getProjects(user_id: string): Promise<type.Project[]>;

  updateProjectName(project_id: number, name: string): Promise<void>;

  moveProjectToTrash(project_id: number): Promise<void>;

  restoreProjectFromTrash(project_id: number): Promise<void>;

  deleteProject(project_id: number): Promise<void>;
}
