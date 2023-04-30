import { DB } from "../../datastore";
import * as type from "../../contracts/types";
import * as api from "../../contracts/api";
// import * as AI from "../../AI";
import { create_version } from "../../gRPC/ai_client/ai_client";
import { MyError } from "../../helpers";

/**
 * @param req (body: { project_id })
 * @param res (body: { version: versionInRes })
 * @description
 * 1. get the project data from DB
 * 2. send boundary and constrains to AI service and get the images of the version
 * 3. Insert the new version with the result to the DB
 * 4. return the version to client
 */

export const createVersion: type.myHandler<
  api.CreateVersionReq,
  api.CreateVersionRes
> = async (req, res, next) => {
  const { project_id } = req.body;

  // ---------------------- 1. get the project data from DB ----------------------
  let project: type.Project;
  try {
    project = await DB.project.getProject(project_id);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in create version handler when getting project data",
      error.message
    );
    return next(myError);
  }

  // ---------------------- 2. send boundary and constrains to AI. get version images ----------------------
  let aiResponse: type.AiVersionResponse;
  const boundary = JSON.stringify(project.boundary);
  const door_position = JSON.stringify(project.door_position);
  const constraints = JSON.stringify(project.constraints);
  create_version(boundary, door_position, constraints)
    .then((response) => {
      aiResponse = response;
    })
    .catch((error) => {
      const myError = new MyError(
        "AI service Error: in create version AI service",
        error.message
      );
      return next(myError);
    });

  // ---------------------- 3. Insert the new version with the result to the DB ----------------------
  const versionDB: type.CreateVersionDB = {
    name: "New Version",
    version_img: aiResponse.version_img,
    version_icon: aiResponse.version_icon,
    project_id,
  };

  let version_id: number;
  try {
    version_id = await DB.version.createVersion(versionDB);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in create version func",
      error.message
    );
    return next(myError);
  }

  const versionInRes: type.Version = {
    id: version_id,
    name: "New Version",
    version_img: aiResponse.version_img,
    version_icon: aiResponse.version_icon,
    created_at: new Date(Date.now()).toLocaleString(),
    deleted: false,
    project_id,
  };

  // ---------------------- 4. return the version to client ----------------------
  res.status(200).send({ version: versionInRes });
  return next("project created successfully");
};
