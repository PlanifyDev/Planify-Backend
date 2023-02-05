import conn from "../connection";
import { projectDao } from "./dao/projectDao";
import { Project, NewProject, Version, NewVersion } from "../contracts/types";
import { MyQuery } from "./query";

export class projectDataStore implements projectDao {
  async createProject(newProject: NewProject): Promise<void> {
    const project: NewProject[] = [];

    // to ensure the order of the keys
    const keys = ["name", "boundary", "image_url", "user_id"];
    for (let i = 0; i < 4; i++) {
      project.push(newProject[keys[i]]);
    }
    try {
      await conn.query(MyQuery.createProject, project);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createVersion(newVersion: NewVersion): Promise<void> {
    const version: NewVersion[] = [];

    // to ensure the order of the keys
    const keys = ["version_num", "name", "image_url", "project_id"];
    for (let i = 0; i < 4; i++) {
      version.push(newVersion[keys[i]]);
    }
    try {
      await conn.query(MyQuery.createVersion, version);
      return Promise.resolve();
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
