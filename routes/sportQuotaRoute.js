const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  addSportQuotaDetail,
  updateSportQuotaDetail,
  viewSportDetail,
} = require("../controller/sportQuotaController");
const {
  addSportQuotaValidation,
  updateSportQuotaValidation,
} = require("../validation/sportQuotaValidation");

router.post(
  "/addsportinfo",
  auth.verifyToken,
  validator.body(addSportQuotaValidation),
  addSportQuotaDetail
);
router.put(
  "/updatesportinfo",
  auth.verifyToken,
  validator.body(updateSportQuotaValidation),
  updateSportQuotaDetail
);
router.get("/viewsportinfo", auth.verifyToken, viewSportDetail);

module.exports = router;
