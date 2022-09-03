const Assets = require("../models/assets");

const createAssets = (req, res) => {
  const userId = req.user._id;
  const { type, value } = req.body;
  const assets = new Assets({
    user: userId,
    type,
    value,
  });
  assets.save((err, newAssets) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: err,
      });
    }
    res.status(200).json({
      message: "Asset successfully created!",
      assets: newAssets,
    });
  });
};

const getAssets = (req, res) => {
  const userId = req.user;
  Assets.find({ user: userId }).exec((err, asset) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: err,
      });
    }

    res.status(200).json({
      asset: asset,
    });
  });
};

const deleteAssets = (req, res) => {
  const assetId = req.body.assetId;

  Assets.findByIdAndDelete(assetId).exec((err, deletedAsset) => {
    if (err) {
      return res.status(500).json({
        message: "Cannot delete asset",
        error: err,
      });
    }

    res.status(200).json({
      message: "Asset Deleted Successfully",
      deletedAsset,
    });
  });
};

module.exports = { createAssets, getAssets, deleteAssets };
