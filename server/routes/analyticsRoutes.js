const express = require("express");
const {
  getTotalUsers,
  getTotalDonations,
  getProjectDonations,
} = require("../controllers/analyticsController");

const router = express.Router();

// Define analytics routes
router.get("/total-users", getTotalUsers);
router.get("/total-donations", getTotalDonations);
router.get("/project/:id", getProjectDonations);

module.exports = router;
