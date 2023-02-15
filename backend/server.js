const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 5000;
const cors = require("cors");

// routes

const categoryRoute = require("./routes/categories.js");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDsdfsdf");
  } catch (error) {
    throw error;
  }
};

// middelwares
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});