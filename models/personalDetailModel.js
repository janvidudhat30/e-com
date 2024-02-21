const mongoose = require("mongoose");

const personalDetailSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Female", "Male", "Other"],
  },
  citizone: {
    type: String,
    required: true,
    enum: ["Yes", "No"],
  },
  category: {
    type: String,
    required: true,
    enum: ["UR", "OBC-NCL", "SC", "ST"],
  },
  minority: {
    type: String,
    required: true,
    enum: ["Sikh Minority", "Christian Minority"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 11,
    maxlength: 50,
    unique: true,
  },
  alternativeEmail: {
    type: String,
    required: false,
    lowercase: true,
    trim: true,
    minlength: 11,
    maxlength: 50,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  alternativePhoneNo: {
    required: false,
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
});

const PersonalDetail = mongoose.model("Personaldetail", personalDetailSchema);
exports.PersonalDetail = PersonalDetail;
