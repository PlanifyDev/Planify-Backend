import { DB } from "../datastore";
import * as type from "../contracts/types";
import * as api from "../contracts/api";
import * as AI from "../AI";

export const createProject: type.myHandler<
  api.CreateProjectReq,
  api.CreateProjectRes
> = async (req, res, next) => {
  const newProject: type.NewProjectReq = req.body;

  // send boundar to AI service and get the images of the project and version
  const aiResult = await AI.createNewProject(newProject.boundary);

  // create new project with the result
  const projectDB: type.NewProjectDB = {
    ...newProject,
    project_img: aiResult.project_img,
    project_icon: aiResult.project_icon,
  };
  const project_id = await DB.createProject(projectDB);

  const projectInRes: type.projectInRes = {
    id: project_id,
    name: newProject.name,
    project_img: aiResult.project_img,
    project_icon: aiResult.project_icon,
    created_at: new Date().toISOString(),
    deleted: false,
  };

  const newVersion: type.NewVersion = {
    version_num: 1,
    name: "version 1",
    version_img: aiResult.version_img,
    version_icon: aiResult.version_icon,
    project_id,
  };

  // create new version with the result
  const version_id = await DB.createVersion(newVersion);

  const version: type.Version = {
    id: version_id,
    ...newVersion,
    created_at: projectInRes.created_at,
    deleted: false,
  };

  res.status(200).send({
    project: projectInRes,
    version,
  });
};
