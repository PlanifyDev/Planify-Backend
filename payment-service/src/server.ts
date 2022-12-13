import express from "express";
import cors from "cors";
// import userRouter from "./routes/userRouter";
// import { loggerMiddleware, errHandler, notFound } from "./middleware";
import { accessEnv } from "./helpers";

const app = express();

app.use(cors());
app.use(express.json());

const port = accessEnv("PORT");

// app.use(loggerMiddleware);

app.get("/", (_, res) => {
  res.status(200).send({ status: "✌️" });
});

// app.use("/", userRouter);

// app.use(errHandler);
// app.use(notFound);
app.listen(port, "::1", () => {
  console.log(`\n\t ✌️ \n\n server listening on port ${port} ...`);
});

export default app;
