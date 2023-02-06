import express from "express";
import cors from "cors";
import { designRouter } from "./routes/designRouter";
import { loggerMiddleware, errHandler, notFound } from "./middleware";
import { accessEnv } from "./helpers";

const app = express();

app.use(cors());
app.use(express.json());

const port = accessEnv("PORT") || 3002;

app.use(loggerMiddleware);

app.get("/test_design", (_, res) => {
  res.status(200).send({ status: "✌️" });
});

app.use("/", designRouter);

app.use(errHandler);
app.use(notFound);
app.listen(port, () => {
  console.log(`\n\t ✌️ \n\n server listening on port ${port} ...`);
});

export default app;
