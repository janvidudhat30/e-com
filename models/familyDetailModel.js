const mongoose = require("mongoose");
const Joi = require("joi");
const familtDetailSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  mothername: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherOfficeAddress: {
    type: String,
    required: false,
  },
  motherPhoneNo: {
    type: String,
    required: false,
  },
  fathername: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherOfficeAddress: {
    type: String,
    required: false,
  },
  fatherPhoneNo: {
    type: String,
    required: false,
  },
});
const FamilyDetail = mongoose.model("Familydetail", familtDetailSchema);
exports.FamilyDetail = FamilyDetail;
