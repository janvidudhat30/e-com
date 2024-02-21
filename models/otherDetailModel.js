const mongoose = require("mongoose");

const otherDetail = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  vaccinationStatus: {
    type: String,
    required: true,
    enum: ["Not Applicable", "Dose 1", "Dose 2", "Dose 3"],
  },
  enrollementStatus: {
    type: String,
    required: false,
    enum: ["Yes", "No", null],
  },
});

const OtherDetail = mongoose.model("OtherDetail", otherDetail);

exports.OtherDetail = OtherDetail;
