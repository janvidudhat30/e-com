const mongoose = require("mongoose");
require('dotenv').config();
const logger = require("../loggers/logger");

module.exports = function () {
  mongoose
    .connect(process.env.CONNECTION)
    .then(() => logger.info("connected to database..."))
    .catch((err) => logger.info("error: ", err));
};
