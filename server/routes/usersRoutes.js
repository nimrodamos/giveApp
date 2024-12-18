const express = require("express");
const {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);

module.exports = router;
