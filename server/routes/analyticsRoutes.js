const express = require("express");
const { getDashboardStats } = require("../controllers/analyticsController");

const router = express.Router();

// Define analytics routes
router.get("/stats", getDashboardStats);

module.exports = router;
