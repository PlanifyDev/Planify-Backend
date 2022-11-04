import express from "express";
import userRouter from "./routes/userRouter";
import { loggerMiddleware, errHandler } from "./middleware";
const app = express();
app.use(express.json());
const port = 3000;

app.use(loggerMiddleware);

app.get("/test", (_, res) => {
  res.status(200).send({ status: "✌️" });
});

app.use("/", userRouter);

app.use(errHandler);

app.listen(port, () => {
  console.log(`\n\t ✌️ \n\n server listening on port ${port} ...`);
});

export default app;