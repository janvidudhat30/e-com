const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  board: {
    type: String,
    required: true,
  },
});

const Board = mongoose.model("boards", boardSchema);

exports.Board = Board;
