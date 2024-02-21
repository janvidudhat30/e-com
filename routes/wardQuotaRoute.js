const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  addWardQuotaValidation,
  updateWardQuotaValidation,
} = require("../validation/wardQuotaValidation");
const {
  addWardQuotaDetail,
  updateWardQuotaDetail,
  viewWardQuota,
} = require("../controller/wardQuotaController");

router.post(
  "/addwardquotainfo",
  auth.verifyToken,
  validator.body(addWardQuotaValidation),
  addWardQuotaDetail
);
router.get("/viewwardquota", auth.verifyToken, viewWardQuota);
router.put(
  "/updatewardquota",
  auth.verifyToken,
  validator.body(updateWardQuotaValidation),
  updateWardQuotaDetail
);

module.exports = router;
