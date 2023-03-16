import { DB } from "../../datastore";
import * as type from "../../contracts/types";
import * as api from "../../contracts/api";
import { MyError } from "../../helpers";

// ---------------------- Get All Projects Handler ----------------------
/**
 * @param req (body: { user_id })
 * @param res (body: { projects: projectRes[] })
 * @description
 * get all projects from DB using user id )
 * 1- get user id from res.locals
 * 2- get all projects from DB using user id
 * 3- return all projects
 */

export const getProjects: type.myHandler<
  api.GetProjectsReq,
  api.GetProjectsRes
> = async (_, res, next) => {
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

// ---------------------- Get Copy Of Project Handler ----------------------
/**
 * @param req (params: { id })
 * @param res (body: { project: projectCopy }) boundary, door_position, constraints
 * @description
 * get copy of project from DB using project id to make a new project with same "boundary"
 * 1- get project id from req.params
 * 2- get project from DB using project id
 * 3- return project to client
 */

export const copyProject: type.myHandlerWithParam<
  api.CopyProjectParam,
  api.CopyProjectReq,
  api.CopyProjectRes
> = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ error: "Project ID is missing" });
    return next("Project ID is missing");
  }
  try {
    const project = await DB.project.getProjectCopy(id);
    res.status(200).send({ project });
  } catch (error) {
    const myError = new MyError(
      "DB Error: in copy project func",
      error.message
    );
    return next(myError);
  }
  return next(`project copied successfully project_id = ${id} `);
};
