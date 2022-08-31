const express = require("express");
const {
  getTransaction,
  createTransaction,
  deleteTransaction,
} = require("../controller/transaction");
const requireSignin = require("../middleware");
const router = express.Router();

// create assets
router.post("/transaction", requireSignin, createTransaction);

// get assets
router.get("/transaction", requireSignin, getTransaction);

// delete Transaction
router.delete("/transaction", requireSignin, deleteTransaction);

module.exports = router;
