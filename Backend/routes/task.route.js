const express = require("express");
const { TasktModel } = require("../models/task.model");

const taskRoute = express.Router();

// Create a new project
taskRoute.post("/create", async (req, res) => {
  try {
    const { name, description, projectId } = req.body;
    const task = new TasktModel({ name, description, projectId });
    await task.save();
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

module.exports = { taskRoute };
