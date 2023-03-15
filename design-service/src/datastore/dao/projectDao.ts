import { Project, CreateProjectDB } from "../../contracts/types";

export interface ProjectDao {
  createProject(newProject: CreateProjectDB): Promise<number>;

  getProject(project_id: number): Promise<Project>;

  getProjects(user_id: string): Promise<Project[]>;

  updateProjectName(project_id: number, name: string): Promise<void>;

  moveProjectToTrash(project_id: number): Promise<void>;

  restoreProjectFromTrash(project_id: number): Promise<void>;

  deleteProject(project_id: number): Promise<void>;
}
