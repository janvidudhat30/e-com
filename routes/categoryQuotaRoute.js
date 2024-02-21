const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  viewPwbdCategory,
  viewMigrant,
  viewCWCategory,
  addOtherCategoryData,
  updateOtherCategoryData,
  viewOtherCategoryData,
} = require("../controller/categoryQuotaController");
const {
  addCategoryQuotaValidation,
  updateCategoryQuotaValidation,
} = require("../validation/categoryQuotaValidation");

router.get("/viewPwbdCategory", auth.verifyToken, viewPwbdCategory);
router.get("/viewceCategory", auth.verifyToken, viewMigrant);
router.get("/viewmigrant", auth.verifyToken, viewCWCategory);
router.post(
  "/addothercategory",
  auth.verifyToken,
  validator.body(addCategoryQuotaValidation),
  addOtherCategoryData
);
router.put(
  "/updateothercategory",
  auth.verifyToken,
  validator.body(updateCategoryQuotaValidation),
  updateOtherCategoryData
);
router.get("/viewothercategory", auth.verifyToken, viewOtherCategoryData);

module.exports = router;
