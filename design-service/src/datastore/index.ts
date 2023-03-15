import { projectDataStore } from "./implements/projects";
import { VersionDataStore } from "./implements/versions";

class DataStore {
  public project: projectDataStore;
  public version: VersionDataStore;

  constructor() {
    this.project = new projectDataStore();
    this.version = new VersionDataStore();
  }
}

export const DB = new DataStore();
