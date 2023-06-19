const express = require("express");
const { TimerModel } = require("../models/timer.model");
const calenderRouter = express.Router();
calenderRouter.get("/isActive", async (req, res) => {
  //const projectid = req.params.id;
  // console.log(projectid);
  const data = await TimerModel.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "_id", // need documents which sync with the model
        foreignField: "timerId",
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
        projectId: "$project._id",
        taskName: "$task.name",
      },
    },
  ]);
  var timers_data = [];
  for (var i = 0; i < data.length; i++) {
    var timer = data[i];
    //console.log(timer);
    ////var task = await TasktModel.findOne({ _id: timer.taskId });
    // console.log(task);
    var timer_data = {
      title: `${timer.projectName}-${timer.taskName}`,
      duration: timer.duration, //right now all the durations are null
      start: timer.startTime,
      end: timer.endTime,
    };
    if (timer.isActive && timer.startTime) {
      timers_data.push(timer_data);
    }
  }
  res.json(timers_data);
});
calenderRouter.get("/isNotActive", async (req, res) => {
  //const projectid = req.params.id;
  //const data = await TimerModel.find();
  const data = await TimerModel.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "_id", // need documents which sync with the model
        foreignField: "timerId",
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
        projectId: "$project._id",
        taskName: "$task.name",
      },
    },
  ]);
  //res.send(data);
  var timers_data = [];
  for (var i = 0; i < data.length; i++) {
    var timer = data[i];
    var timer_data = {
      title: `${timer.projectName}-${timer.taskName}`,
      start: timer.startTime,
      end: timer.endTime,
      extendedProps: {
        duration: timer.duration,
      },
    };
    if (!timer.isActive && timer.startTime && timer.endTime) {
      timers_data.push(timer_data);
    }
  }
  res.json(timers_data);
});
calenderRouter.get("/", async (req, res) => {
  const data = await TimerModel.find();
  res.send(data);
});
module.exports = { calenderRouter };
