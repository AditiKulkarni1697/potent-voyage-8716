const express = require("express");
const { TasktModel } = require("../models/task.model");
const { TimerModel } = require("../models/timer.model");
const mongoose = require("mongoose");

const taskRoute = express.Router();

// Create a new task
taskRoute.post("/create", async (req, res) => {
  try {
    const { name, description, projectId } = req.body;
    const timer = new TimerModel({
      projectId,
    });
    const savedTimer = await timer.save();
    const task = new TasktModel({
      name,
      description,
      projectId,
      timerId: savedTimer._id,
    });
    const savedTask = await task.save();
    res.status(200).json({ savedTask, savedTimer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Get all tasks
taskRoute.get("/", async (req, res) => {
  try {
    const tasks = await TasktModel.find();
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Get all tasks of a specific project
taskRoute.get("/tasks/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await TasktModel.find({ projectId });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

//get a specific task
taskRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TasktModel.findById(id).populate("timerId").exec();

    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

//update the task
taskRoute.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TasktModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

//delete the task
taskRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TasktModel.findByIdAndRemove(id);
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    res.status(200).json({ message: "task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = { taskRoute };
