const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const usersRoutes = require("./routes/usersRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const donationsRoutes = require("./routes/donationsRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

dotenv.config();

const PORT = 3000;
const uri = process.env.MONGO_URI;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/users", usersRoutes);
app.use("/projects", projectsRoutes);
app.use("/donations", donationsRoutes);
app.use("/analytics", analyticsRoutes);

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database successfully.");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
