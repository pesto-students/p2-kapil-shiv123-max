const mongoose = require("mongoose");

const equitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    marketValue: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Equity", equitySchema);
