const express = require("express");
const { rootRouter } = require("./routes/root.router");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", rootRouter);

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
