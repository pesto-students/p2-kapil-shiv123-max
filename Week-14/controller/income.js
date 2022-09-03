const FixedIncome = require("../models/income");

const setIncome = (req, res) => {
  const userId = req.user._id;
  const { salary } = req.body;
  const income = new FixedIncome({
    user: userId,
    salary,
  });
  income.save((err, salary) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: err,
      });
    }
    res.status(200).json({
      message: "Salary successfuly set!",
      details: salary,
    });
  });
};

const getIncome = (req, res) => {
  const userId = req.user;
  FixedIncome.find({ user: userId }).exec((err, details) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: err,
      });
    }

    res.status(200).json({
      details,
    });
  });
};

// User.findByIdAndUpdate(user_id, { name: "Gourav" }, function (err, docs) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Updated User : ", docs);
//   }
// });

const updateIncome = (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  const updatedIncome = req.body.updatedIncome;
  FixedIncome.findOneAndUpdate(
    { user: userId },
    { salary: updatedIncome },
    { new: true },
    function (err, updatedDetails) {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      }
      res.status(200).json({
        message: "Salary Updated Successfully",
        details: updatedDetails,
      });
    }
  );
};

module.exports = { setIncome, getIncome, updateIncome };
