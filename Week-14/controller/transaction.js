const Transaction = require("../models/transaction");

const createTransaction = (req, res) => {
  const userId = req.user._id;
  const { date = Date.now(), amount } = req.body;
  const transaction = new Transaction({
    user: userId,
    date,
    amount,
  });
  transaction.save((err, newTransaction) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: err,
      });
    }
    res.status(200).json({
      message: "Transaction successfully created!",
      assets: newTransaction,
    });
  });
};

const getTransaction = (req, res) => {
  const userId = req.user;
  const { startDate, endDate, detailed = false } = req.query;
  Transaction.find({
    user: userId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  }).exec((err, transactions) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: err,
      });
    }

    if (!transactions) {
      return res.status(400).json({
        message: "No transactions found",
      });
    }

    const totalBalance = transactions.reduce(
      (prev, curr) => prev + curr.amount,
      0
    );

    const totalDebit = transactions.reduce(
      (prev, curr) => prev + (curr.amount > 0 ? 0 : -curr.amount),
      0
    );

    const totalCredit = transactions.reduce(
      (prev, curr) => prev + (curr.amount < 0 ? 0 : curr.amount),
      0
    );

    let result = {
      totalBalance,
      totalCredit,
      totalDebit,
    };

    if (detailed) {
      result.transactions = transactions;
    }

    res.status(200).json({
      result,
    });
  });
};

const deleteTransaction = (req, res) => {
  const transactionId = req.body.transactionId;

  Transaction.findByIdAndDelete(transactionId).exec(
    (err, deletedTransaction) => {
      if (err) {
        return res.status(500).json({
          message: "Cannot delete transaction",
          error: err,
        });
      }

      res.status(200).json({
        message: "Transaction Deleted Successfully",
        deletedTransaction,
      });
    }
  );
};

const getDetailedTransactions = (req, res) => {};
module.exports = { createTransaction, getTransaction, deleteTransaction };
