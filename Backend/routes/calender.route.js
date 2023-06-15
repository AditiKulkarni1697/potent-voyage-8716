const express = require("express");
const { TimerModel } = require("../models/timer.model");
const calenderRouter = express.Router();

calenderRouter.get("/", async (req, res) => {
  const data = await TimerModel.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "taskId",
        foreignField: "_id",
        as: "task",
      },
    },
    {
      $unwind: "$task",
    },
    {
      $lookup: {
        from: "projects",
        localField: "task.projectId",
        foreignField: "_id",
        as: "project",
      },
    },
    {
      $unwind: "$project",
    },
    {
      $project: {
        _id: 0,
        startTime: 1,
        endTime: 1,
        duration: 1,
        isActive: 1,
        projectName: "$project.name",
        taskName: "$task.name",
      },
    },
  ]);

  //   const data = await TimerModel.find();
  res.send(data);
});

module.exports = { calenderRouter };
