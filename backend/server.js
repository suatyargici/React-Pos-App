const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors")
const port = 5000;

const categoryRoute = require("./routes/categories.js");


dotenv.config(); 

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

app.use(express.json());
app.use(cors());
// app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/categories",categoryRoute)


app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});