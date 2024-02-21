const mongoose = require("mongoose");

const additionalDetail = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  applyModeBA: {
    type: String,
    required: true,
    enum: ["Online", "Offline"],
  },
  applyModeBSC: {
    type: String,
    required: true,
    enum: ["Online", "Offline"],
  },
});

const AdditionalDetail = mongoose.model("AdditionalDetail", additionalDetail);

exports.AdditionalDetail = AdditionalDetail;
