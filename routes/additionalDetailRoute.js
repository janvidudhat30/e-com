const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  additionalDetailValidation,
  updateAdditionalDetailValidation,
} = require("../validation/additionalDetailValidation");
const {
  addDetail,
  viewAdditonalDetail,
  updateAdditonalDetail,
} = require("../controller/additionalDetailController");

router.post(
  "/adddetail",
  auth.verifyToken,
  validator.body(additionalDetailValidation),
  addDetail
);
router.get("/viewadditonaldetail", auth.verifyToken, viewAdditonalDetail);
router.put(
  "/updateadditonaldetail",
  auth.verifyToken,
  validator.body(updateAdditionalDetailValidation),
  updateAdditonalDetail
);

module.exports = router;
