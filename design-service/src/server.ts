import express from "express";
import cors from "cors";
import { projectRouter, versionRouter } from "./routes";
import { loggerMiddleware, notFound } from "./middleware";
import { accessEnv, logger } from "./helpers";
const app = express();

app.use(cors());
app.use(express.json());

const port = accessEnv("PORT") || 3002;

// app.use(loggerMiddleware);

app.get("/test_design", (_, res) => {
  res.status(200).send({ status: "🫡" });
});

app.use("/project", projectRouter);
app.use("/version", versionRouter);

app.use(loggerMiddleware);
app.use(notFound);
app.listen(port, "0.0.0.0", () => {
  logger.info(`\t 🫡    server listening on port ${port} .....`);
});

export default app;
