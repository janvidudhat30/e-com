const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  addBankDetail,
  viewBankDetail,
  updateBankDetail,
} = require("../controller/bankDetailController");
const {
  bankDetailValidation,
  updateBankDetailValidation,
} = require("../validation/bankDetailValidation");

router.post(
  "/addbankdetail",
  auth.verifyToken,
  validator.body(bankDetailValidation),
  addBankDetail
);
router.get("/viewbankdetail", auth.verifyToken, viewBankDetail);
router.put(
  "/updatebankdetail",
  auth.verifyToken,
  validator.body(updateBankDetailValidation),
  updateBankDetail
);

module.exports = router;
