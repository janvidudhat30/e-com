const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  registrationValidation,
  updatePasswordValidation,
  loginValidation,
} = require("../validation/registrationValidation");
const {
  registration,
  updatePassword,
  login,
} = require("../controller/userController");

router.post("/adduser", validator.body(registrationValidation), registration);
router.post(
  "/updatepassword",
  validator.body(updatePasswordValidation),
  updatePassword
);
router.post(
  "/login",
  auth.genrateToken,
  validator.body(loginValidation),
  login
);

module.exports = router;
