const mongoose = require("mongoose");

const wardQuotaDetail = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
    enum: ["Not Applicable", "Yes"],
  },
});

const WardQuota = mongoose.model("wardQuota", wardQuotaDetail);
exports.WardQuota = WardQuota;
