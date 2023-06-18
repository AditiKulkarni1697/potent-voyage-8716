const express = require("express");
const { ProjectModel } = require("../models/project.model");

const projectRoute = express.Router();

// Create a new project
projectRoute.post("/create", async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = new ProjectModel({
      name,
      description,
    });

    await project.save();
    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Get all projects
projectRoute.get("/", async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

//get a specific project
projectRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

//update a project
projectRoute.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await ProjectModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

//delete a project
projectRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await ProjectModel.findByIdAndRemove(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = { projectRoute };
