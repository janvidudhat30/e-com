const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  addPersonalData,
  viewPersonalData,
  updatePersonalData,
} = require("../controller/personalDetailController");
const {
  addPersonalDetailValidation,
  updatePersonalDetailValidation,
} = require("../validation/personalDetailValidation");

router.post(
  "/personalinfo",
  auth.verifyToken,
  validator.body(addPersonalDetailValidation),
  addPersonalData
);
router.get("/viewpersonalinfo", auth.verifyToken, viewPersonalData);
router.put(
  "/updatepersonalinfo",
  auth.verifyToken,
  validator.body(updatePersonalDetailValidation),
  updatePersonalData
);

module.exports = router;
