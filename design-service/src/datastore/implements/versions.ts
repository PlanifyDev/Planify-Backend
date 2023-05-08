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

  async createVersion(
    newVersion: CreateVersionDB
  ): Promise<{ id: number; name: string }> {
    const version = [
      newVersion.version_img,
      newVersion.version_icon,
      newVersion.constraints,
      newVersion.project_id,
    ];

    try {
      const { id, name } = await (
        await DB_CONN.query(MyQuery.createVersion, version)
      ).rows[0];
      return Promise.resolve({ id, name });
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
