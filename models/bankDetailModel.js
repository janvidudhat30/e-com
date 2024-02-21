const mongoose = require("mongoose");

const bankDetailSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
    enum: ["BOI", "SBI", "HDFC"],
  },
  accountNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{9,18}$/.test(v);
      },
      message: "Invalid account number",
    },
  },
  ifscCode: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]{4}\d{7}$/.test(v);
      },
      message: "Invalid IFSC code",
    },
  },
});

const BankDetail = mongoose.model("BankDetail", bankDetailSchema);

exports.BankDetail = BankDetail;
