import { DB } from "../datastore";
import * as type from "../contracts/types";
import * as api from "../contracts/api";

// ----------------- Get All Projects Handler -------------------------
export const getProjects: type.myHandler<
  api.GetProjectsReq,
  api.GetProjectsRes
> = async (req, res, next) => {
  const user_id = res.locals.userId;
  try {
    const projects = await DB.getProjects(user_id);
    res.status(200).send({ projects });
  } catch (error) {
    next(error);
  }
};
