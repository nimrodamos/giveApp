const mongoose = require("mongoose");
const User = require("../models/User");
const Donation = require("../models/Donation");

// Get total number of users
const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.send({ totalUsers });
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch total users" });
  }
};

// Get total amount of donations
const getTotalDonations = async (req, res) => {
  try {
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    res.send({ totalDonations: totalDonations[0]?.total || 0 });
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch total donations" });
  }
};

// Get total donations for a specific project
const getProjectDonations = async (req, res) => {
  try {
    const projectDonations = await Donation.aggregate([
      { $match: { project_id: mongoose.Types.ObjectId(req.params.id) } },
      { $group: { _id: "$project_id", total: { $sum: "$amount" } } },
    ]);
    res.send({ total: projectDonations[0]?.total || 0 });
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch project donations" });
  }
};

module.exports = {
  getTotalUsers,
  getTotalDonations,
  getProjectDonations,
};
