const Joi = require("joi");

module.exports = {
  //add category quota validation
  addressValidation: Joi.object({
    addressLine1: Joi.string().max(150).required().messages({
      "string.base": `"addressLine1" should be a type of 'text'`,
      "string.empty": `"addressLine1" cannot be an empty field`,
      "any.required": `"addressLine1" is a required field`,
      "string.max": `"addressLine1" should not exceed 150 characters`,
    }),
    addressLine2: Joi.string().max(150).required().messages({
      "string.base": `"addressLine2" should be a type of 'text'`,
      "string.empty": `"addressLine2" cannot be an empty field`,
      "any.required": `"addressLine2" is a required field`,
      "string.max": `"addressLine2" should not exceed 150 characters`,
    }),
    country: Joi.string().max(150).required().messages({
      "string.base": `"country" should be a type of 'text'`,
      "string.empty": `"country" cannot be an empty field`,
      "any.required": `"country" is a required field`,
      "string.max": `"country" should not exceed 150 characters`,
    }),
    state: Joi.string().max(150).required().messages({
      "string.base": `"state" should be a type of 'text'`,
      "string.empty": `"state" cannot be an empty field`,
      "any.required": `"state" is a required field`,
      "string.max": `"state" should not exceed 150 characters`,
    }),
    city: Joi.string().max(150).required().messages({
      "string.base": `"city" should be a type of 'text'`,
      "string.empty": `"city" cannot be an empty field`,
      "any.required": `"city" is a required field`,
      "string.max": `"city" should not exceed 150 characters`,
    }),
    pincode: Joi.number().min(111111).max(999999).required().messages({
      "number.base": `"pincode" should be a type of 'text'`,
      "number.empty": `"pincode" cannot be an empty field`,
      "any.required": `"pincode" is a required field`,
      "number.max": `"pincode" should not exceed value 999999`,
    }),
  }),
  
  //update Address Validation
  updateAddressValidation: Joi.object({
    addressLine1: Joi.string().max(150).optional().messages({
      "string.base": `"addressLine1" should be a type of 'text'`,
      "string.empty": `"addressLine1" cannot be an empty field`,
      "string.max": `"addressLine1" should not exceed 150 characters`,
    }),
    addressLine2: Joi.string().max(150).optional().messages({
      "string.base": `"addressLine2" should be a type of 'text'`,
      "string.empty": `"addressLine2" cannot be an empty field`,
      "string.max": `"addressLine2" should not exceed 150 characters`,
    }),
    country: Joi.string().max(150).optional().messages({
      "string.base": `"country" should be a type of 'text'`,
      "string.empty": `"country" cannot be an empty field`,
      "string.max": `"country" should not exceed 150 characters`,
    }),
    state: Joi.string().max(150).optional().messages({
      "string.base": `"state" should be a type of 'text'`,
      "string.empty": `"state" cannot be an empty field`,
      "string.max": `"state" should not exceed 150 characters`,
    }),
    city: Joi.string().max(150).optional().messages({
      "string.base": `"city" should be a type of 'text'`,
      "string.empty": `"city" cannot be an empty field`,
      "string.max": `"city" should not exceed 150 characters`,
    }),
    pincode: Joi.number().min(111111).max(999999).optional().messages({
      "number.base": `"pincode" should be a type of 'text'`,
      "number.empty": `"pincode" cannot be an empty field`,
      "number.max": `"pincode" should not exceed value 999999`,
    }),
  }),
};
