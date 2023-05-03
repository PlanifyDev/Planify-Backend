import { DB_CONN } from "../../connections";
import { VersionDao } from "../dao/versionDao";
import { Version, CreateVersionDB } from "../../contracts/types";
import { MyQuery } from "../query";

export class VersionDataStore implements VersionDao {
  private static _instance: VersionDataStore;
  private constructor() {}

  static get Instance() {
    return this._instance || (this._instance = new this());
  }

  async createVersion(newVersion: CreateVersionDB): Promise<number> {
    const version: CreateVersionDB[] = [];

    // to ensure the order of the keys
    const keys = ["name", "version_img", "version_icon", "project_id"];
    keys.forEach((key) => {
      version.push(newVersion[key]);
    });
    try {
      const version_id = await (
        await DB_CONN.query(MyQuery.createVersion, version)
      ).rows[0].id;
      return Promise.resolve(version_id);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getVersions(project_id: number): Promise<Version[]> {
    try {
      const result = await DB_CONN.query(MyQuery.getVersions, [project_id]);
      return Promise.resolve(result.rows);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateVersionName(version_id: number, name: string): Promise<void> {
    try {
      await DB_CONN.query(MyQuery.updateVersionName, [name, version_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async moveVersionToTrash(version_id: number): Promise<void> {
    try {
      DB_CONN.query(MyQuery.moveVersionToTrash, [version_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async restoreVersionFromTrash(version_id: number): Promise<void> {
    try {
      DB_CONN.query(MyQuery.restoreVersionFromTrash, [version_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteVersion(version_id: number): Promise<void> {
    try {
      DB_CONN.query(MyQuery.deleteVersion, [version_id]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
