const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({

  applicationNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    
  },
  dob: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: false,
    trim: true,
    maxlength: 250,
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
  },
  otp: {
    type: Number,
    required: false,
  },
});

const defaultSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("Registration", registrationSchema);
const Default = mongoose.model("Default", defaultSchema);

exports.User = User;
exports.Default = Default;
