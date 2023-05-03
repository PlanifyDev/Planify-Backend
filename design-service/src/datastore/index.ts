import { projectDataStore } from "./implements/projects";
import { VersionDataStore } from "./implements/versions";

class DataStore {
  public project: projectDataStore;
  public version: VersionDataStore;

  constructor() {
    this.project = projectDataStore.Instance;
    this.version = VersionDataStore.Instance;
  }
}

export const DB = new DataStore();
