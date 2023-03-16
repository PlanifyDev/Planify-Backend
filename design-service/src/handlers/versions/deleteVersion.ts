import { DB } from "../../datastore";
import * as type from "../../contracts/types";
import * as api from "../../contracts/api";
import { MyError } from "../../helpers";

// ---------------------- Move Version To Trash Handler ----------------------
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if version id is missing
 * 2. move version to trash in DB using version id
 * 3. return success
 */

export const moveVersionToTrash: type.myHandlerWithParam<
  api.MoveVersionToTrashParam,
  api.MoveVersionToTrashReq,
  api.MoveVersionToTrashRes
> = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ error: "Version ID is missing" });
    return next("Version ID is missing");
  }
  try {
    await DB.version.moveVersionToTrash(id);
    res.sendStatus(200);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in move version to trash func",
      error.message
    );
    return next(myError);
  }
  return next(`version moved to trash successfully version_id = ${id} `);
};

// ---------------------- Restore Version From Trash Handler ----------------------
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if version id is missing
 * 2. restore version from trash in DB using version id
 * 3. return success
 */

export const restoreVersionTrash: type.myHandlerWithParam<
  api.RestoreVersionFromTrashParam,
  api.RestoreVersionFromTrashReq,
  api.RestoreVersionFromTrashRes
> = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ error: "Version ID is missing" });
    return next("Version ID is missing");
  }
  try {
    await DB.version.restoreVersionFromTrash(id);
    res.sendStatus(200);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in restore version from trash func",
      error.message
    );
    return next(myError);
  }
  return next(`version restored from trash successfully version_id = ${id} `);
};

// ---------------------- Delete Version Handler ----------------------
/**
 * @param req (params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if version id is missing
 * 2. delete version from DB using version id
 * 3. return success
 */

export const deleteVersion: type.myHandlerWithParam<
  api.DeleteVersionParam,
  api.DeleteVersionReq,
  api.DeleteVersionRes
> = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ error: "Version ID is missing" });
    return next("Version ID is missing");
  }
  try {
    await DB.version.deleteVersion(id);
    res.sendStatus(200);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in delete version func",
      error.message
    );
    return next(myError);
  }
  return next(`version deleted successfully version_id = ${id} `);
};
