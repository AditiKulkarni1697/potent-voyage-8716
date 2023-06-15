const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project" },
  },
  { timestamps: true }
);

const TasktModel = mongoose.model("task", taskSchema);

module.exports = { TasktModel };
