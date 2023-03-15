import conn from "../../connection";
import { ProjectDao } from "../dao/projectDao";
import { Project, CreateProjectDB } from "../../contracts/types";
import { MyQuery } from "../query";

export class projectDataStore implements ProjectDao {
  async createProject(newProjectDB: CreateProjectDB): Promise<number> {
    const project: CreateProjectDB[] = [];

    // to ensure the order of the keys
    const keys = ["name", "boundary", "project_img", "project_icon", "user_id"];
    for (let i = 0; i < 5; i++) {
      project.push(newProjectDB[keys[i]]);
    }
    try {
      const project_id = await (
        await conn.query(MyQuery.createProject, project)
      ).rows[0].id;
      return Promise.resolve(project_id);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getProject(project_id: number): Promise<Project> {
    try {
      const result = await conn.query(MyQuery.getProject, [project_id]);
      return Promise.resolve(result.rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getProjects(user_id: string): Promise<Project[]> {
    try {
      const result = await conn.query(MyQuery.getProjects, [user_id]);
      return Promise.resolve(result.rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateProjectName(project_id: number, name: string): Promise<void> {
    try {
      await conn.query(MyQuery.updateProjectName, [name, project_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async moveProjectToTrash(project_id: number): Promise<void> {
    try {
      conn.query(MyQuery.moveProjectToTrash, [project_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async restoreProjectFromTrash(project_id: number): Promise<void> {
    try {
      conn.query(MyQuery.restoreProjectFromTrash, [project_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
    //
  }

  async deleteProject(project_id: number): Promise<void> {
    try {
      conn.query(MyQuery.deleteProject, [project_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
    //
  }
}
