import { DB } from "../../datastore";
import * as type from "../../contracts/types";
import * as api from "../../contracts/api";
import { MyError } from "../../helpers";

// ---------------------- update project name handler ----------------------
/**
 * @param req (params: { id }) (body: { name, user_id })
 * @param res (status: 200)
 * @description
 * 1. check if project name and id is missing
 * 2. update project name in DB
 */

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
