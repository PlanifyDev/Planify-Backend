export type EndpointConfig = {
  url: string;
  method: "put" | "get" | "post" | "delete";
  handler: string;
  auth?: boolean;
};

// endpoints for project
export const Endpoints = {
  createProject: { method: "post", url: "/", handler: "createProject", auth: true},
  getProjects: { method: "get", url: "/", handler: "getProjects", auth: true },
  copyProject: { method: "get", url: "/copy/:id", handler: "copyProject", auth: true},
  updateProjectName: { method: "put", url: "/:id", handler: "updateProjectName", auth: true},
  moveProjectToTrash: { method: "put", url: "/trash/:id", handler: "moveProjectToTrash",auth: true},
  restoreProjectTrash: { method: "put", url: "/restore/:id", handler: "restoreProjectTrash",auth: true},
  deleteProject: { method: "delete", url: "/:id", handler: "deleteProject",auth: true},
};

// endpoints for version
export const VersionsEndpoints = {
  createVersion: { method: "post", url: "/", handler: "createVersion", auth: true },
  getVersions: { method: "get", url: "/", handler: "getVersions", auth: true },
  updateVersionName: { method: "put", url: "/:id", handler: "updateVersionName", auth: true },
  moveVersionToTrash: { method: "put", url: "/trash/:id", handler: "moveVersionToTrash", auth: true },
  restoreVersionTrash: { method: "put", url: "/restore/:id", handler: "restoreVersionTrash", auth: true },
  deleteVersion: { method: "delete", url: "/:id", handler: "deleteVersion", auth: true }
};

