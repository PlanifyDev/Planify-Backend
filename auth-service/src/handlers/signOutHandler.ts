import { SignOutParam, SignOutReq, SignOutRes } from "../contracts/api";
import { myHandlerWithParam } from "../contracts/types";
import { cache } from "../cache";

export const signOutHandler: myHandlerWithParam<
  SignOutParam,
  SignOutReq,
  SignOutRes
> = async (req, res) => {
  const { id } = req.params;
  await cache
    .signOutCache(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
