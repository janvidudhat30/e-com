const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
});

const Year = mongoose.model("years", yearSchema);

exports.Year = Year;
