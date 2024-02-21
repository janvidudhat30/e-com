const config = require("config");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const genrateToken = (req, res, next) => {
  const token = jwt.sign(
    { applicationNo: req.body.applicationNo },
    config.get(process.env.PRIVATE_KEY),
    { expiresIn: "1hour" }
  );

  res.middlewareData = token;
  next();
};

const verifyToken = (req, res, next) => {
  const token_value = req.header("x-auth-token");
  if (token_value == undefined) {
    res.send("access denied...");
  }
  try {
    const verify = jwt.verify(token_value, config.get(process.env.PRIVATE_KEY));
    req.user = verify;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token..");
  }
};

exports.genrateToken = genrateToken;
exports.verifyToken = verifyToken;
