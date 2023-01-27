import { ERRORS, verifyToken } from "../../helpers";
import { DB } from "../../datastore";
import { JwtPayload } from "../../contracts/types";

type Output = {
  user_id: string;
};
export const verifyJwt = async (jwt: string): Promise<Output> => {
  if (!jwt) {
    return Promise.reject("Invalid Token");
  }

  let payload: JwtPayload;
  try {
    payload = verifyToken(jwt);
  } catch (error) {
    return Promise.reject(ERRORS[error.message]);
  }

  const user = await DB.getUserById(payload.userId);
  if (!user) {
    return Promise.reject(ERRORS.USER_NOT_FOUND);
  }

  if (!user.verified) {
    return Promise.reject(ERRORS.NOT_VERIFIED);
  }

  return Promise.resolve({
    user_id: user.id,
  });
};
