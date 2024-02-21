const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  addFamilyDetailValidation,
  updateFamilyDetailValidation,
} = require("../validation/familyDetailValidation");
const {
  addFamilyData,
  viewFamilyData,
  updateFamilyData,
} = require("../controller/familyDetailController");

router.post(
  "/addfamilyinfo",
  auth.verifyToken,
  validator.body(addFamilyDetailValidation),
  addFamilyData
);
router.get("/viewfamilyinfo", auth.verifyToken, viewFamilyData);
router.put(
  "/updatefamilyinfo",
  auth.verifyToken,
  validator.body(updateFamilyDetailValidation),
  updateFamilyData
);

module.exports = router;
