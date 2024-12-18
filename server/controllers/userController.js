const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(201).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { password, ...userData } = req.body;

    // Hash the password
    const saltRounds = 10; // Number of hashing rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();

    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Login User
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "username and password are required..." });
    const storedUser = await User.findOne({ email: email });
    console.log(storedUser);
    if (!storedUser)
      return res.status(400).json({ message: `could not find user ${email}` });

    const isValid = bcrypt.compareSync(password, storedUser.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid password..." });
    }

    const token = jwt.sign(
      {
        user: {
          email,
          userId: storedUser._id,
          role: storedUser.role || "user",
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("aaa");
    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(200)
      .json({ user: storedUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Logout user
const logoutUser = (req, res) => {
  try {
    res
      .clearCookie("jwt", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "User logged out successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed due to a server error.",
      error,
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid User ID" });
  }

  try {
    const user = await User.findById(id);
    if (user) {
      return res.send(user);
    }
    res.status(404).send({ message: "User not found" });
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
};

const getLoggedUser = async (req, res) => {
  console.log("logged");

  try {
    if (!req.user || !req.user.userId) {
      return res
        .status(400)
        .json({ message: "User not authenticated or missing userId." });
    }

    const { userId } = req.user;
    console.log("Logged in user ID:", userId);
    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (err) {
    console.error("Error in getLoggedUser:", err);
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};
// Update user by ID
const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (user) return res.send(user);
    res.status(404).send({ message: "User not found" });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  getAllUsers,
  getLoggedUser,
  logoutUser,
};
