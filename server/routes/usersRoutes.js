const express = require("express");
const {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  getAllUsers,
  getLoggedUser,
  logoutUser,
} = require("../controllers/userController");

const { authUser } = require("../middleware/authentication");

const router = express.Router();

router.get("/logout", authUser, logoutUser);
router.get("/me", authUser, getLoggedUser);
router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);

module.exports = router;
