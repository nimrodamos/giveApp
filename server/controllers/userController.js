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
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(200)
      .json({ message: `User ${email} logged in successfully.`, token });
  } catch (error) {
    res.status(500).send(error);
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
