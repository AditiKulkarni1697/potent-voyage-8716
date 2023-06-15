const express = require("express");
const { TasktModel } = require("../models/project.model");

const taskRoute = express.Router();

// Create a new project
taskRoute.post("/create", async (req, res) => {
  try {
    const { name, description } = req.body;
    const task = new TasktModel({
      name,
      description,
    });

    await task.save();
    res.status(200).json({ task });
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

taskRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TasktModel.findById(id);
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});
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
