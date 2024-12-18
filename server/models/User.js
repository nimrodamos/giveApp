const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    about: { type: String },
    city: { type: String },
    role: { type: String, default: "user" },
    profilePic: {
      type: String,
      default: "../media/b3e0d1f1-62f6-4fe7-a150-d8358f2bc660.jpg",
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);
module.exports = mongoose.model("User", UserSchema);
