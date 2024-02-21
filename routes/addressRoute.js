const express = require("express");
const router = express.Router();
const auth = require("../helper/auth");
const { validator } = require("../validation/validator");
const {
  viewCountry,
  viewState,
  viewCity,
  addAddress,
  updateAddress,
  viewAddress,
} = require("../controller/addressController");
const {
  addressValidation,
  updateAddressValidation,
} = require("../validation/addressValidation");

router.get("/viewcountry", auth.verifyToken, viewCountry);
router.get("/viewstate/:countryid", auth.verifyToken, viewState);
router.get("/viewcity/:countryid/:stateid", auth.verifyToken, viewCity);
router.post(
  "/address",
  auth.verifyToken,
  validator.body(addressValidation),
  addAddress
);
router.put(
  "/updateaddress",
  auth.verifyToken,
  validator.body(updateAddressValidation),
  updateAddress
);
router.get("/viewaddress", auth.verifyToken, viewAddress);

module.exports = router;
