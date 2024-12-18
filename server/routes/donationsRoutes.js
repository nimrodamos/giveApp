const express = require("express");
const {
  createDonation,
  getDonationsByProjectId,
  getDonationsByUserId,
} = require("../controllers/donationController");

const router = express.Router();

router.post("/", createDonation);
router.get("/project/:id", getDonationsByProjectId);
router.get("/user/:id", getDonationsByUserId);

module.exports = router;
