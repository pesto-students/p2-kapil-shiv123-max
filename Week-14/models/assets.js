const mongoose = require("mongoose");

const assetsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mf: {
      type: Number,
    },
    gold: {
      type: Number,
    },
    crypto: {
      type: Number,
    },
    silver: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assets", assetsSchema);
