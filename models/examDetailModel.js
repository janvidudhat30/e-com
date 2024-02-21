const mongoose = require("mongoose");

const examDetail = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
    ref: "boards",
  },
  resultStatus: {
    type: String,
    required: true,
    enum: ["Awaited", "Passed"],
  },
  boardRollNo: {
    type: String,
    required: true,
  },
  passingYear: {
    type: String,
    required: true,
    ref: "years",
  },
});

const ExamDetail = mongoose.model("ExamDetail", examDetail);

exports.ExamDetail = ExamDetail;
