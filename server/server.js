const express = require("express");
const { json } = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
console.log("hello");


const uri = process.env.MONGO_URI;

const app = express();
mongoose
  .connect(uri)
  .then(async () => {
    console.log("Connected to database. Checking documents...");
  })
  .catch((error) => {
    console.error(
      "Error connecting to the database or running operations:",
      error
    );
  });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(json());
