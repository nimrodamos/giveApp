const express = require("express");
const {
  createDonation,
  getDonationsByProjectId,
  getDonationsByUserId,
  getAllDonations,
} = require("../controllers/donationController");

const router = express.Router();

router.post("/", createDonation);
router.get("/project/:id", getDonationsByProjectId);
router.get("/user/:id", getDonationsByUserId);
router.get("/", getAllDonations);

module.exports = router;
