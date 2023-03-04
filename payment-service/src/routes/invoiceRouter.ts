import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authByCache } from "../middleware";
import * as invoiceHandler from "../handlers/invoiceHandler";

export const invoiceRouter = Router();

invoiceRouter.post(
  "/create",
  authByCache,
  asyncHandler(invoiceHandler.createInvoice)
);

invoiceRouter.get(
  "/",
  authByCache,
  asyncHandler(invoiceHandler.getAllInvoices)
);

invoiceRouter.get(
  "/:payment_id",
  authByCache,
  asyncHandler(invoiceHandler.getInvoice)
);

invoiceRouter.delete(
  "/:payment_id",
  authByCache,
  asyncHandler(invoiceHandler.deleteInvoice)
);

export default invoiceRouter;
