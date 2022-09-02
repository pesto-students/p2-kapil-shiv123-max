const express = require("express");
const requireSignin = require("../middleware");
const router = express.Router();
const { setIncome, getIncome, updateIncome } = require("../controller/income");

// set income
router.post("/fixedIncome", requireSignin, setIncome);

// getincome
router.get("/fixedIncome", requireSignin, getIncome);

// // update income
router.post("/fixedIncome/update", requireSignin, updateIncome);

module.exports = router;
