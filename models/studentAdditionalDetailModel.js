const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  schoolType: {
    type: String,
    required: true,
    enum: ["Primary", "Secondary", "Higher-Secondary"],
  },
  location: {
    type: String,
    required: true,
    enum: [
      "Delhi",
      "Gujarat",
      "Rajasthan",
      "Maharashtra",
      "Punjab",
      "Uttar Pradesh",
      "Madhya Pradesh",
      "West Bengal",
    ],
  },
  medium: {
    type: String,
    required: true,
    enum: ["Hindi", "English", "Gujarati", "Marathi", "Punjabi"],
  },
  stdOfHindi: {
    type: Number,
    enum: [12, 10, 8, 5],
    required: true,
  },
});

const StudentAdditionalDetail = mongoose.model(
  "StudentAdditionalDetail",
  yearSchema
);

exports.StudentAdditionalDetail = StudentAdditionalDetail;
