import { DB } from "../datastore";
import * as type from "../contracts/types";
import * as api from "../contracts/api";
import { MyError } from "../helpers";

// ---------------------- Get All Projects Handler ----------------------
export const getProjects: type.myHandler<
  api.GetProjectsReq,
  api.GetProjectsRes
> = async (req, res, next) => {
  const user_id = res.locals.userId;
  try {
    const projects = await DB.project.getProjects(user_id);
    res.status(200).send({ projects });
  } catch (error) {
    const myError = new MyError(
      "DB Error: in get all project func",
      error.message
    );
    return next(myError);
  }
  return next("all projects sent successfully");
};

// ---------------------- update project name handler ----------------------
export const updateProjectName: type.myHandlerWithParam<
  api.UpdateProjectNameParam,
  api.UpdateProjectNameReq,
  api.UpdateProjectNameRes
> = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    res.status(400).send({ error: "Project name is missing" });
    return next("Project name is missing");
  }
  if (!id) {
    res.status(400).send({ error: "Project ID is missing" });
    return next("Project ID is missing");
  }
  try {
    await DB.project.updateProjectName(id, name);
    res.sendStatus(200);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in update project name func",
      error.message
    );
    return next(myError);
  }
  return next(`Project name updated successfully, project_id = ${id}`);
};

// ---------------------- move project to trash handler ----------------------
export const moveProjectToTrash: type.myHandlerWithParam<
  api.MoveProjectToTrashParam,
  api.MoveProjectToTrashReq,
  api.MoveProjectToTrashRes
> = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ error: "Project ID is missing" });
    return next("Project ID is missing");
  }
  try {
    await DB.project.moveProjectToTrash(id);
    res.sendStatus(200);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in move project to trash func",
      error.message
    );
    return next(myError);
  }
  return next(`Project moved to trash successfully, project_id = ${id} `);
};

// ---------------------- restore project from trash handler ----------------------
export const restoreProjectTrash: type.myHandlerWithParam<
  api.RestoreProjectFromTrashParam,
  api.RestoreProjectFromTrashReq,
  api.RestoreProjectFromTrashRes
> = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ error: "Project ID is missing" });
    return next("Project ID is missing");
  }
  try {
    await DB.project.restoreProjectFromTrash(id);
    res.sendStatus(200);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in restore project from trash func",
      error.message
    );
    return next(myError);
  }
  return next(`Project restored from trash successfully, project_id = ${id} `);
};

// ---------------------- delete project permanently handler ----------------------
export const deleteProject: type.myHandlerWithParam<
  api.DeleteProjectParam,
  api.DeleteProjectReq,
  api.DeleteProjectReq
> = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ error: "Project ID is missing" });
    return next("Project ID is missing");
  }

  try {
    await DB.project.deleteProject(id);
    res.sendStatus(200);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in delete project permanently func",
      error.message
    );
    return next(myError);
  }
  return next(`Project deleted permanently successfully, project_id = ${id} `);
};
