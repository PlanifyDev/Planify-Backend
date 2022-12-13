import { DB } from "../datastore";
import * as type from "../contracts/types";
import * as api from "../contracts/api";
import * as help from "../helpers";

export const updateAllHandler: type.myHandlerWithParam<
  api.UpdateAllParam,
  api.UpdateAllReq,
  api.UpdateAllRes
> = async (req, res, next) => {
  // ------ check validation of new data -------
  const notValidMsg = help.notValid(
    { firstname: req.body.firstname },
    { lastname: req.body.lastname },
    { password: req.body.password }
  );
  if (notValidMsg) {
    return res.status(400).send({ error: notValidMsg as string });
  }

  // -------------------------------------------

  // ----------- get user data from DB --------
  let user: type.UserDB;
  try {
    user = await DB.getUserById(res.locals.userId);
  } catch (error) {
    return next(error);
  }

  const firstname = req.body.firstname || user.firstname;
  const lastname = req.body.lastname || user.lastname;
  let password = user.password;

  // ---- if he need to change password must pass old password ---------
  if (req.body.password) {
    if (!req.body.oldPassword) {
      return res
        .status(400)
        .send({ error: "Old password is required to update " });
    }

    if (help.notValid({ password: req.body.oldPassword })) {
      return res.status(400).send({ error: "Wrong password" });
    }

    // ------------ check if old password is correct -----------
    const isMatch = await help.comparePassword(
      req.body.oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).send({ error: "Wrong password" });
    }

    // ---- hash new password to save in DB -------------------
    password = await help.hashPassword(req.body.password);
  }

  const newUser: type.UserNewData = {
    firstname,
    lastname,
    password,
  };

  // ------------- send new data to update db ---------------
  await DB.updateAllData(user.id, newUser).catch((error) => {
    return next(error);
  });
  return res.sendStatus(200);
};

// =====================================================================
// =====================================================================

export const deleteUserHandler: type.myHandlerWithParam<
  api.DeleteUserParam,
  never,
  never
> = async (req, res, next) => {
  const userId = res.locals.userId;

  await DB.deleteUser(userId).catch((err) => {
    return next(err);
  });
  return res.sendStatus(200);
};

export const cleardb: type.myHandler<never, never> = async (req, res, next) => {
  await DB.clearUsers()
    .then(() => {
      return res.sendStatus(200);
    })
    .catch((err) => {
      return next(err);
    });
};
