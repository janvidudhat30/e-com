const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  addStudentDetailValidation,
  updateStudentDetailValidation,
} = require("../validation/studentAdditionalDetailValidation");
const {
  addStudentAdditionalDetails,
  viewStudentDetail,
  updateStudentDetail,
} = require("../controller/studentAdditonalDetailController");

router.post(
  "/addstudentinfo",
  auth.verifyToken,
  validator.body(addStudentDetailValidation),
  addStudentAdditionalDetails
);
router.get("/viewstudentinfo", auth.verifyToken, viewStudentDetail);
router.put(
  "/updatestudentinfo",
  auth.verifyToken,
  validator.body(updateStudentDetailValidation),
  updateStudentDetail
);

module.exports = router;
