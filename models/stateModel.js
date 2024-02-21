const mongoose = require("mongoose");

const state = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  countryId: {
    type: String,
    required: true,
  },
});

const State = mongoose.model("states", state);

exports.State = State;
