import * as api from "../../contracts/api";
import { myHandlerWithQuery } from "../../contracts/types";

export const cancel: myHandlerWithQuery<
  api.PaypalCancelReq,
  api.PaypalCancelRes,
  api.PaypalCancelQuery
> = async (req, res) => {
  // todo
  // change payment status to "canceled"

  res.redirect("http://localhost:3001/test_pay");
};
