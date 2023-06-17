const express = require("express");
const { TimerModel } = require("../models/timer.model");
const { TasktModel } = require("../models/task.model");
const calenderRouter = express.Router();

calenderRouter.get("/isActive", async (req, res) => {
  //const data = await TimerModel.aggregate([
  // {
  //   $lookup: {
  //     from: "tasks",
  //     localField: "taskId",
  //     foreignField: "_id",
  //     as: "task",
  //   },
  // },
  // {
  //   $unwind: "$task",
  // },
  // {
  //   $lookup: {
  //     from: "projects",
  //     localField: "task.projectId",
  //     foreignField: "_id",
  //     as: "project",
  //   },
  // },
  // {
  //   $unwind: "$project",
  // },
  // {
  //   $project: {
  //     _id: 0,
  //     startTime: 1,
  //     endTime: 1,
  //     duration: 1,
  //     isActive: 1,
  //     projectName: "$project.name",
  //     taskName: "$task.name",
  //   },
  // }
  const data = await TimerModel.find();
  var timers_data = [];

  for (var i = 0; i < data.length; i++) {
    var timer = data[i];
    //console.log(timer);
    var task = await TasktModel.findOne({ _id: timer.taskId });
    console.log(task);
    var timer_data = {
      title: timer.taskId,
      start: timer.startTime,
      end: timer.endTime,
    };
    if (timer.isActive) {
      timers_data.push(timer_data);
    }
  }

  res.json(timers_data);
});

calenderRouter.get("/isNotActive", async (req, res) => {
  //const data = await TimerModel.aggregate([
  // {
  //   $lookup: {
  //     from: "tasks",
  //     localField: "taskId",
  //     foreignField: "_id",
  //     as: "task",
  //   },
  // },
  // {
  //   $unwind: "$task",
  // },
  // {
  //   $lookup: {
  //     from: "projects",
  //     localField: "task.projectId",
  //     foreignField: "_id",
  //     as: "project",
  //   },
  // },
  // {
  //   $unwind: "$project",
  // },
  // {
  //   $project: {
  //     _id: 0,
  //     startTime: 1,
  //     endTime: 1,
  //     duration: 1,
  //     isActive: 1,
  //     projectName: "$project.name",
  //     taskName: "$task.name",
  //   },
  // }
  const data = await TimerModel.find();
  var timers_data = [];

  for (var i = 0; i < data.length; i++) {
    var timer = data[i];

    var timer_data = {
      title: timer.taskId,
      start: timer.startTime,

      end: timer.endTime,
      duration: "5",
    };
    if (!timer.isActive) {
      timers_data.push(timer_data);
    }
  }

  res.json(timers_data);
});

calenderRouter.get("/list", async (req, res) => {
  // const data = await TimerModel.aggregate([
  //   {
  //     $lookup: {
  //       from: "tasks",
  //       localField: "taskId",
  //       foreignField: "_id",
  //       as: "task",
  //     },
  //   },
  //   {
  //     $unwind: "$task",
  //   },
  //   {
  //     $lookup: {
  //       from: "projects",
  //       localField: "task.projectId",
  //       foreignField: "_id",
  //       as: "project",
  //     },
  //   },
  //   {
  //     $unwind: "$project",
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       startTime: 1,
  //       endTime: 1,
  //       duration: 1,
  //       isActive: 1,
  //       projectName: "$project.name",
  //       taskName: "$task.name",
  //     },
  //   },
  // ]);

  const data = await TimerModel.find();
  res.send(data);
});

module.exports = { calenderRouter };
