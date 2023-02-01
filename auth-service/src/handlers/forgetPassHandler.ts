import { DB } from "../datastore";
import * as type from "../contracts/types";
import * as api from "../contracts/api";
import * as help from "../helpers";

export const forgetPassHandler: type.myHandler<
  api.ForgetPassReq,
  api.ForgetPassRes
> = async (req, res, next) => {
  const { email } = req.body;

  // check if email is valid
  if (help.notValid({ email })) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // check if email exists
  const user = await DB.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }
  if (!user.verified) {
    return res.status(400).json({
      error: "User not verified",
    });
  }
  // generate token
  const token = help.createToken(
    { userId: user.id, verified: user.verified },
    "1h"
  );

  // send email
  // TODO: change the link to the frontend link
  help.sendPassEmail(
    user.email,
    `<a href="http://localhost:3000/resetpassword?token=${token}">Reset Password</a>`
  );

  return res.sendStatus(200);
};

export const resetPassHandler: type.myHandler<
  api.ResetPassReq,
  api.ResetPassRes
> = async (req, res, next) => {
  const { newpassword } = req.body;
  const token = req.query.token as string;

  // check if token is valid
  let payload: type.JwtPayload;
  try {
    payload = help.verifyToken(token);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  // check if password is valid
  const notValid = help.notValid({ password: newpassword });
  if (notValid) {
    return res.status(400).json({ error: notValid as string });
  }

  // get user data from db
  const user = await DB.getUserById(payload.userId);
  const password = await help.hashPassword(newpassword);
  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }
  // update password
  await DB.updatePassword(user.id, password);

  return res.sendStatus(200);
};
