const express=require('express');
const app=express();
const logger = require("./loggers/logger");
const Connection = require("./helper/responseMessage");

require('./startup/db')();
require('dotenv').config();
require('./startup/routes')(app);
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(require("./helper/response"));
app.use(require("./helper/error").handleJoiErrors);
app.use(require("./helper/error").handleErrors);

const port=process.env.PORT||Connection.PORT;
app.listen(port,()=>logger.info(`listening on port ${port}`));
