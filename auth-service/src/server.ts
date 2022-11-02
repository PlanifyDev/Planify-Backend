import express from "express";
import { testHandler } from "./handlers/userHandler";
const app = express();
const port = 3000;

app.get("/test", (_, res) => {
  res.status(200).send({ status: "✌️" });
});
app.get("/", testHandler);

app.listen(port, () => {
  console.log(`\n\t ✌️ \n\n server listening on port ${port} ...`);
});

export default app;
