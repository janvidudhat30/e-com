const { Country } = require("../models/countryModel");
const { State } = require("../models/stateModel");
const { City } = require("../models/cityModel");
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    ref: Country,
  },
  state: {
    type: String,
    required: true,
    ref: State,
  },
  city: {
    type: String,
    required: true,
    ref: City,
  },
  pincode: {
    type: Number,
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

exports.Address = Address;
