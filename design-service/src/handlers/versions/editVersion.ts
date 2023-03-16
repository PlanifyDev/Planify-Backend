import { DB } from "../../datastore";
import * as type from "../../contracts/types";
import * as api from "../../contracts/api";
import { MyError } from "../../helpers";

// ---------------------- Update Version Name Handler ----------------------
/**
 * @param req (body: { name }, params: { id })
 * @param res (status: 200)
 * @description
 * 1. check if version name and id is missing
 * 2. update version name in DB using version id
 * 3. return success
 */

export const updateVersionName: type.myHandlerWithParam<
  api.UpdateVersionNameParam,
  api.UpdateVersionNameReq,
  api.UpdateVersionNameRes
> = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    res.status(400).send({ error: "Version name is missing" });
    return next("Version name is missing");
  }
  try {
    await DB.version.updateVersionName(id, name);
    res.sendStatus(200);
  } catch (error) {
    const myError = new MyError(
      "DB Error: in update version name func",
      error.message
    );
    return next(myError);
  }
  return next(`version name updated successfully version_id = ${id} `);
};
