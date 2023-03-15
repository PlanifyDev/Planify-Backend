import { DB } from "../datastore";
import * as type from "../contracts/types";
import * as api from "../contracts/api";
import * as AI from "../AI";
import { MyError } from "../helpers";

/**
 * @param req
 * @param res
 * @param next
 * @returns
 * @description
 * 1. send boundary to AI service and get the images of the project and version
 * 2. create new project with the result
 * 3. create new version with the result
 * 4. return the project and version
 */

export const createProject: type.myHandler<
  api.CreateProjectReq,
  api.CreateProjectRes
> = async (req, res, next) => {
  const newProject: type.NewProjectReq = req.body;

  // ---------------------- 1. send boundary to AI. get project & version images ----------------------
  let aiResponse: type.AiResponse;
  try {
    aiResponse = await AI.createNewProject(newProject.boundary);
  } catch (error) {
    const myError = new MyError(
      "AI service Error: in create project service",
      error.message
    );
    return next(myError);
  }

  // ---------------------- 2. create new project with the result ----------------------
  const projectDB: type.CreateProjectDB = {
    ...newProject,
    project_img: aiResponse.project_img,
    project_icon: aiResponse.project_icon,
  };

  let project_id: number;
  try {
    project_id = await DB.project.createProject(projectDB);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in create project func",
      error.message
    );
    return next(myError);
  }

  const projectInRes: type.projectRes = {
    id: project_id,
    name: newProject.name,
    project_img: aiResponse.project_img,
    project_icon: aiResponse.project_icon,
    created_at: new Date(Date.now()).toLocaleString(),
    deleted: false,
  };

  // ---------------------- 3. create new version with the result ----------------------
  const newVersion: type.CreateVersionDB = {
    version_num: 1,
    name: "version 1",
    version_img: aiResponse.version_img,
    version_icon: aiResponse.version_icon,
    project_id,
  };

  let version_id: number;
  try {
    version_id = await DB.version.createVersion(newVersion);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in create version func",
      error.message
    );
    return next(myError);
  }

  const version: type.Version = {
    id: version_id,
    ...newVersion,
    created_at: projectInRes.created_at,
    deleted: false,
  };

  // ---------------------- 4. return the project and version ----------------------
  res.status(200).send({
    project: projectInRes,
    version,
  });
  return next("project created successfully");
};
