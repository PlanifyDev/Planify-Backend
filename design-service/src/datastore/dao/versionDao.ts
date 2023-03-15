import { Version, CreateVersionDB } from "../../contracts/types";
export interface VersionDao {
  createVersion(newVersion: CreateVersionDB): Promise<number>;

  getVersions(project_id: number): Promise<Version[]>;

  updateVersionName(version_id: number, name: string): Promise<void>;

  moveVersionToTrash(version_id: number): Promise<void>;

  restoreVersionFromTrash(version_id: number): Promise<void>;

  deleteVersion(version_id: number): Promise<void>;
}
