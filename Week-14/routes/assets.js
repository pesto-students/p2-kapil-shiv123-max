const express = require("express");
const {
  getAssets,
  updateAssets,
  deleteAssets,
  createAssets,
} = require("../controller/assets.js");
const requireSignin = require("../middleware");
const router = express.Router();

// create assets
router.post("/assets", requireSignin, createAssets);

// get assets
router.get("/assets", requireSignin, getAssets);

// delete assets
router.delete("/assets", requireSignin, deleteAssets);

module.exports = router;
