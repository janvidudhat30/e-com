const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  viewActivities,
  addEcaQuotaDetail,
  viewEcaQuotaDetail,
  updateEcaQuotaDetail,
} = require("../controller/ecaQuotaController");
const {
  addEcaQuotaValidation,
  updateEcaQuotaValidation,
} = require("../validation/ecaQuotaValidation");

router.get("/viewactivities", auth.verifyToken, viewActivities);
router.post(
  "/addecadetail",
  auth.verifyToken,
  validator.body(addEcaQuotaValidation),
  addEcaQuotaDetail
);
router.put(
  "/updateecadetail",
  auth.verifyToken,
  validator.body(updateEcaQuotaValidation),
  updateEcaQuotaDetail
);
router.get("/viewecadetail", auth.verifyToken, viewEcaQuotaDetail);

module.exports = router;
