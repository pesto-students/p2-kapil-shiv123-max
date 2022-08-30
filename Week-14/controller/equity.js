const Equity = require("../models/equity");

const createEquity = (req, res) => {
  const userId = req.user._id;
  const { company,units,cost } = req.body;
  const equity = new Equity({
    user: userId,
    company,
    units,
    cost
  });
  equity.save((err, newEquity) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: err,
      });
    }
    res.status(200).json({
      message: "Equity successfully created!",
      assets: newEquity,
    });
  });
};

const getEquity = (req, res) => {
  const userId = req.user;
  Equity.find({ user: userId }).exec((err, equity) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: err,
      });
    }

    if (equity) {
      return res.status(200).json({
        equity,
      });
    }
  });
};

const deleteEquity = (req, res) => {
  const equityId = req.body.equityId;

  Equity.findByIdAndDelete(equityId).exec((err, deletedEquity) => {
    if (err) {
      return res.status(500).json({
        message: "Cannot delete equity",
        error: err,
      });
    }

    res.status(200).json({
      message: "Equity Deleted Successfully",
      deletedEquity,
    });
  });
};

module.exports = { createEquity, getEquity, deleteEquity };
