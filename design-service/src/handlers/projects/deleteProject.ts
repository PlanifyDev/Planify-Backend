import { DB } from "../../datastore";
import * as type from "../../contracts/types";
import * as api from "../../contracts/api";
import { MyError } from "../../helpers";

// ---------------------- move project to trash handler ----------------------
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if project id is missing
 * 2. update project trashed status to true in DB s
 */
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
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if project id is missing
 * 2. update project trashed status to false in DB
 */
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
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if project id is missing
 * 2. delete project from DB
 * 3. delete all versions of this project from DB (cascade delete in SQL)
 */
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
