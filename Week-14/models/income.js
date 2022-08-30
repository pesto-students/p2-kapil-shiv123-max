const mongoose = require("mongoose");

const fixedIncomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    salary: {
        type: Number,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FixedIncome", fixedIncomeSchema);
