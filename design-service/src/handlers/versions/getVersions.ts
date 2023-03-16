import { DB } from "../../datastore";
import * as type from "../../contracts/types";
import * as api from "../../contracts/api";
import { MyError } from "../../helpers";

// ---------------------- Get All Versions Handler ----------------------
/**
 * @param req (body: { project_id })
 * @param res (body: { versions })
 * @description
 * 1. check if project id is missing
 * 2. get all versions of the project from DB using project id
 * 3. return versions
 */
export const getVersions: type.myHandler<
  api.GetVersionsReq,
  api.GetVersionsRes
> = async (req, res, next) => {
  const { project_id } = req.body;
  if (!project_id) {
    res.status(400).send({ error: "Project ID is missing" });
    return next("Project ID is missing");
  }
  try {
    const versions = await DB.version.getVersions(project_id);
    res.status(200).send({ versions });
  } catch (error) {
    const myError = new MyError(
      "DB Error: in get all versions func",
      error.message
    );
    return next(myError);
  }
  return next("all versions sent successfully");
};

// todo
// get version graph to edit it
