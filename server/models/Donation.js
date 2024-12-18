const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    comment: { type: String },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
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

module.exports = mongoose.model("Donation", DonationSchema);
