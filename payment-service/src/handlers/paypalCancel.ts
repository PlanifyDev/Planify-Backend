import * as api from "../contracts/api";
import { myHandlerWithQuery } from "../contracts/types";

export const cancel: myHandlerWithQuery<
  api.PaypalCancelReq,
  api.PaypalCancelRes,
  api.PaypalCancelQuery
> = async (req, res) => {
  // todo: redirect to home page in front end
  // res.redirect("home page in front end");
  res.redirect("http://localhost:3001");
};
