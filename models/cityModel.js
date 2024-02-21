const mongoose = require("mongoose");

const city = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  countryId: {
    type: String,
    required: true,
  },
  stateId: {
    type: String,
    required: true,
  },
});

const City = mongoose.model("cities", city);

exports.City = City;
