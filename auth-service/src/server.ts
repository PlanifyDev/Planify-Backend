import express from "express";

const app = express();
const port = 3000;
app.get("/test", (_, res) => {
  res.status(200).send({ status: "✌️" });
});

app.listen(port, () => {
  console.log(`\n\t ✌️ \n\n server listening on port ${port} ...`);
});
