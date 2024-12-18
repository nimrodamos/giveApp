const mongoose = require("mongoose");

const ProjectDetailsSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    images: [{ type: String }],
    text: { type: String },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("ProjectDetails", ProjectDetailsSchema);
