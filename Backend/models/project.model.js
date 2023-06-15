const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    // createdBy: { type: Schema.Types.ObjectId, ref: "user" },

  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = { ProjectModel };
