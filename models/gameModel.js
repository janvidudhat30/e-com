const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  game: {
    type: String,
    required: true,
  },
});

const Game = mongoose.model("games", gameSchema);

exports.Game = Game;
