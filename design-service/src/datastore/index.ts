import conn from "../connection";
import { projectDao } from "./dao/projectDao";
import { Project, NewProjectDB, Version, NewVersion } from "../contracts/types";
import { MyQuery } from "./query";

export class projectDataStore implements projectDao {
  async createProject(newProjectDB: NewProjectDB): Promise<number> {
    const project: NewProjectDB[] = [];

    // to ensure the order of the keys
    const keys = ["name", "boundary", "image_url", "user_id"];
    for (let i = 0; i < 4; i++) {
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

  async createVersion(newVersion: NewVersion): Promise<number> {
    const version: NewVersion[] = [];

    // to ensure the order of the keys
    const keys = ["version_num", "name", "image_url", "project_id"];
    for (let i = 0; i < 4; i++) {
      version.push(newVersion[keys[i]]);
    }
    try {
      const version_id = await (
        await conn.query(MyQuery.createVersion, version)
      ).rows[0].id;
      return Promise.resolve(version_id);
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

  async getVersions(project_id: number): Promise<Version[]> {
    try {
      const result = await conn.query(MyQuery.getVersions, [project_id]);
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

  async updateVersionName(version_id: number, name: string): Promise<void> {
    try {
      await conn.query(MyQuery.updateVersionName, [name, version_id]);
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

  async moveVersionToTrash(version_id: number): Promise<void> {
    try {
      conn.query(MyQuery.moveVersionToTrash, [version_id]);
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

  async restoreVersionFromTrash(version_id: number): Promise<void> {
    try {
      conn.query(MyQuery.restoreVersionFromTrash, [version_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
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

  async deleteVersion(version_id: number): Promise<void> {
    try {
      conn.query(MyQuery.deleteVersion, [version_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export const DB = new projectDataStore();
