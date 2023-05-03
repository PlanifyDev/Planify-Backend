import { DB } from "../datastore";
import * as type from "../contracts/types";
import * as api from "../contracts/api";
import * as help from "../helpers";
import { cache } from "../cache";

// ----------------- update name and password ------------------------------
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
  let user: type.User;
  try {
    user = await DB.getUserById(res.locals.userId);
  } catch (error) {
    return next(error);
  }

  const firstname = req.body.firstname || user.firstname;
  const lastname = req.body.lastname || user.lastname;
  const image_url = req.body.image_url || user.image_url;
  let password = user.password;
  const role = req.body.role || user.role;
  const country = req.body.country || user.country;

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

  const newUser: type.UserUpdateData = {
    firstname,
    lastname,
    password,
    image_url,
    role,
    country,
  };
  // ------------- update name in cache ----------------------

  // await cache.updateNameCache(user.id, firstname, lastname).catch((error) => {
  //   return next(error);
  // });

  // // ------------- update image in cache ----------------------
  // await cache.updateImageCache(user.id, image_url).catch((error) => {
  //   return next(error);
  // });

  // ------------- update user data in cache ----------------------
  const userCache = {
    firstname,
    lastname,
    image_url,
    role,
    country,
  };

  await cache.updateUserDataCache(user.id, userCache).catch((error) => {
    return next(error);
  });

  // ------------- send new data to update db ---------------
  await DB.updateAllData(user.id, newUser).catch((error) => {
    return next(error);
  });
  return res.sendStatus(200);
};
