const mongoose = require("mongoose");

const ecaQuotaSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  sportApplicationStatus: {
    type: String,
    required: true,
    enum: ["Yes", "No"],
  },
  curricularActivity: {
    type: String,
    required: false,
    ref: "activities",
    default:null
  },
  subCategory: {
    type: String,
    required: false,
    ref: "activities",
    default:null
  },
});

const EcaQuota = mongoose.model("EcaQuota", ecaQuotaSchema);

exports.EcaQuota = EcaQuota;
