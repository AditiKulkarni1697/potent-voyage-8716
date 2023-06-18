const express = require("express");
const timerRoute = express.Router();
const { TimerModel } = require("../models/timer.model");


const mongoose = require("mongoose");
const { TasktModel } = require("../models/task.model");


timerRoute.post("/", async (req, res) => {
  try {
    const { startTime, endTime, taskId } = req.body;

    const time = new TimerModel({ startTime, endTime, taskId });
    await time.save();
    res.status(200).send("time setted");
  } catch (error) {
    console.log(error);
  }
});

timerRoute.post("/start", async (req, res) => {
  try {
    const { timerId } = req.body;

    console.log(req.body);

    console.log(timerId);

    const savedTimer = await TimerModel.findById(timerId);

    savedTimer.start();

    const startedTimer = await savedTimer.save();

    res.status(200).send(startedTimer);
  } catch (error) {
    console.log(error);
  }
});

timerRoute.post("/stop", async (req, res) => {
  try {
    const { timerId } = req.body;

    const time = await TimerModel.findById(timerId);
    time.stop();
    const stoppedTimer = await time.save();
    res.status(200).send(stoppedTimer);
  } catch (error) {
    console.log(error);
  }
});

timerRoute.get("/data/:start/:end", async (req, res) => {
  let { start, end } = req.params;

  const startDate = new Date(start);
  startDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(end);
  endDate.setUTCHours(23, 59, 59, 999);
  console.log(startDate, endDate);

  let data = await TimerModel.aggregate([
    {
      $match: {
        startTime: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $lookup: {
        from: "tasks", // Replace "tasks" with the actual name of the TaskModel collection
        localField: "taskId",
        foreignField: "_id",
        as: "task",
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
        totalDuration: { $sum: "$duration" },
        count: { $sum: 1 },
        tasks: { $first: "$task" }, // Include the "task" field from the first document in each group
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  res.send(data);
});

timerRoute.get("/data", async (req, res) => {
  let data = await TimerModel.find();
  res.send(data);
});

module.exports = { timerRoute };
