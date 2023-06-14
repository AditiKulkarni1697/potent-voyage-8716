require("dotenv").config();
const express = require("express");
const { connection } = require("../Backend/db");
const { timerRoute } = require("./routes/timer.route");
const app = express();

app.use(express.json());

app.use("/time", timerRoute);

app.listen(3300, async () => {
  await connection;
  console.log("server started");
});
