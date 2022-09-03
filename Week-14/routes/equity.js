const express = require("express");
const {getEquity,createEquity,deleteEquity} = require("../controller/equity")
const requireSignin = require("../middleware");
const router = express.Router();

// create assets
router.post("/equity", requireSignin, createEquity);

// get assets
router.get("/equity", requireSignin, getEquity);

// delete Equity
router.delete("/equity", requireSignin, deleteEquity);

module.exports = router;
