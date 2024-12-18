const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "https://picsum.photos/500" },
    goal: { type: Number, required: true },
    current_amount: { type: Number, default: 0 },
    end_date: { type: Date },
    status: { type: String, default: "active" },
    category: {type : String, default: "אחר"},
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  }
);
module.exports = mongoose.model("Project", ProjectSchema);
