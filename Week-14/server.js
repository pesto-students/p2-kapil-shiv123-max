const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/auth");
const assetRoutes = require("./routes/assets");
const equityRoutes = require("./routes/equity");

dotenv.config();
const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connected");
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the portfolio API.😄",
  });
});

app.use("/api/user", userRoutes);
app.use("/api", assetRoutes);
app.use("/api", equityRoutes);

app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});
