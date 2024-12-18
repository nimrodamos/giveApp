const mongoose = require("mongoose");
const User = require("../models/User");
const Donation = require("../models/Donation");
const Project = require("../models/Project");

// Get total projects, total donations amount, and total unique donors
const getDashboardStats = async (req, res) => {
  try {
    // Get total number of projects
    const totalProjects = await Project.countDocuments();

    // Get total donations amount
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Get total unique donors (distinct userIds)
    const totalUniqueDonors = await Donation.distinct("user_id");

    res.send({
      totalProjects,
      totalDonations: totalDonations[0]?.total || 0,
      totalUniqueDonors: totalUniqueDonors.length,
    });
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch dashboard stats" });
  }
};

module.exports = {
  getDashboardStats,
};
