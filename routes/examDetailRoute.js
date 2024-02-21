const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  viewBoardNames,
  viewYear,
  addExamDetail,
  viewExamDetail,
  updateExamDetail,
} = require("../controller/examDetailController");
const {
  addExamDetailValidation,
  updateExamDetailValidation,
} = require("../validation/examDetailValidation");

router.get("/viewboard", auth.verifyToken, viewBoardNames);
router.get("/viewyear", auth.verifyToken, viewYear);
router.post(
  "/addexamdetail",
  auth.verifyToken,
  validator.body(addExamDetailValidation),
  addExamDetail
);
router.put(
  "/updateaddress",
  auth.verifyToken,
  validator.body(updateExamDetailValidation),
  updateExamDetail
);
router.get("/viewexamdetail", auth.verifyToken, viewExamDetail);

module.exports = router;
