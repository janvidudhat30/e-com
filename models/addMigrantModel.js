const mongoose = require("mongoose");

const migrantSchema = new mongoose.Schema({
  migrantname: {
    type: String,
    required: true,
  },
});

const Migrant = mongoose.model("Migrant", migrantSchema);

exports.Migrant = Migrant;
