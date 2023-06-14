const express = require("express");
const timerRoute = express.Router();
const { TimerModel } = require("../models/timer.model");

timerRoute.post("/", async (req, res) => {
  try {
    const { startTime, endTime } = req.body;

    const time = new TimerModel({ startTime, endTime });
    await time.save();
    res.status(200).send("time setted");
  } catch (error) {
    console.log(error);
  }
});

module.exports = { timerRoute };
