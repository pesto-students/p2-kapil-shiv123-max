const mongoose = require("mongoose");

const assetsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Gold", "Crypto", "Bond"],
    },
    value: {
      purchasedValue: {
        type: Number,
        required: true,
      },
      currentValue: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assets", assetsSchema);
