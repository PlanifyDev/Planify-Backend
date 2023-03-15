export type EndpointConfig = {
  url: string;
  method: "put" | "get" | "post" | "delete";
  handler: string;
  auth?: boolean;
};

// endpoints for the contract
export const Endpoints = {
  createProject: { method: "post", url: "/project", handler: "createProject", auth: true},
  getProjects: { method: "get", url: "/project", handler: "getProjects" ,auth: true},
  updateProjectName: { method: "put", url: "/project/:id", handler: "updateProjectName", auth: true},
  moveProjectToTrash: { method: "put", url: "/project/trash/:id", handler: "moveProjectToTrash",auth: true},
  restoreProjectTrash: { method: "put", url: "/project/restore/:id", handler: "restoreProjectTrash",auth: true},
  deleteProject: { method: "delete", url: "/project/:id", handler: "deleteProject",auth: true},
};
