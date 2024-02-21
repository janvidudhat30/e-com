const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  addOtherDetailValidation,
  updateOtherDetailValidation,
} = require("../validation/otherDetailValildation");
const {
  addOtherDetail,
  viewOtherDetail,
  updateOtherDetail,
} = require("../controller/otherDetailController");

router.post(
  "/addotherdetail",
  auth.verifyToken,
  validator.body(addOtherDetailValidation),
  addOtherDetail
);
router.get("/viewotherdetail", auth.verifyToken, viewOtherDetail);
router.put(
  "/updateotherdetail",
  auth.verifyToken,
  validator.body(updateOtherDetailValidation),
  updateOtherDetail
);

module.exports = router;
