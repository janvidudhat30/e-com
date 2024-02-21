const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  maxTheoryMarks: {
    type: Number,
    required: true,
  },
  maxStudentTheoryMarks: {
    type: Number,
    required: true,
  },
  maxPracticalMarks: {
    type: Number,
    required: true,
  },
  maxStudentPracticalMarks: {
    type: Number,
    required: true,
  },
  maxTotal: {
    type: Number,
    required: true,
  },
  maxStudentTotal: {
    type: Number,
    required: true,
  },
});
const Subject = mongoose.model("Subject", subjectSchema);

exports.Subject = Subject;
