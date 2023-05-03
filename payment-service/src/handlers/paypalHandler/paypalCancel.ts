import * as api from "../../contracts/api";
import { myHandlerWithQuery } from "../../contracts/types";
import { accessEnv } from "../../helpers";
const FRONT_END_URL = accessEnv("FRONT_END_URL");
export const cancel: myHandlerWithQuery<
  api.PaypalCancelReq,
  api.PaypalCancelRes,
  api.PaypalCancelQuery
> = async (req, res) => {
  // todo
  // change payment status to "canceled"

  res.redirect(FRONT_END_URL);
};
