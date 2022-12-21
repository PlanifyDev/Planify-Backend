import express from "express";
import cors from "cors";
import "express-async-errors";
import paypalRouter from "./routes/paypalRouter";
import { loggerMiddleware, errHandler, notFound } from "./middleware";
import { accessEnv, paypalConfig } from "./helpers";

const app = express();

app.use(cors());
app.use(express.json());

const port = accessEnv("PORT");

app.use(loggerMiddleware);

app.get("/test_pay", (_, res) => {
  res.status(200).send({ status: "✌️" });
});

paypalConfig(); // configurations paypal sdk

app.use("/", paypalRouter);

app.use(errHandler);
app.use(notFound);
app.listen(port, "::1", () => {
  console.log(`\n\t ✌️ \n\n server listening on port ${port} ...`);
});

export default app;
