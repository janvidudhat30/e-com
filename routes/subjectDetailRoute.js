const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  addSubjectDetailValidation,
  updateSubjectDetailValidation,
} = require("../validation/subjectDetailValidation");
const {
  addSubjectDetails,
  updateSubjectDetail,
  viewSubjectDetail,
} = require("../controller/subjectDetailController");

router.post(
  "/addsubjectdetail",
  auth.verifyToken,
  validator.body(addSubjectDetailValidation),
  addSubjectDetails
);
router.get("/viewotherdetail", auth.verifyToken, viewSubjectDetail);
router.put(
  "/updatesubjectdetail",
  auth.verifyToken,
  validator.body(updateSubjectDetailValidation),
  updateSubjectDetail
);

module.exports = router;
