import { DB } from "../../datastore";
import * as type from "../../contracts/types";
import * as api from "../../contracts/api";
// import * as AI from "../../AI";
import { create_project } from "../../gRPC/ai_client/ai_client";
import { MyError } from "../../helpers";

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

  // ---------------------- 1. send boundary to AI. get project images & icon ----------------------
  let aiResponse: type.AiProjectResponse;

  const boundary = JSON.stringify(newProject.boundary);
  const door_position = JSON.stringify(newProject.door_position);
  await create_project(boundary, door_position)
    .then((response) => {
      aiResponse = response;
    })
    .catch((error) => {
      const myError = new MyError(
        "AI service Error: in create project AI service",
        error.message
      );
      return next(myError);
    });

  // ---------------------- 2. create new project with the result ----------------------
  const projectDB: type.CreateProjectDB = {
    ...newProject,
    project_img: aiResponse.project_img,
    project_icon: aiResponse.project_icon,
    user_id: res.locals.user_id,
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

  // ---------------------- 4. return the project and version ----------------------

  res.status(200).send({
    project: projectInRes,
  });
  return next("project created successfully");
};
