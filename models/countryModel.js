const mongoose = require("mongoose");

const country = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
});

const Country = mongoose.model("countries", country);

exports.Country = Country;
