const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Login User ]
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) return res.send(user);
    res.status(404).send({ message: "User not found" });
  } catch (err) {
    res.status(500).send(err);
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
};
