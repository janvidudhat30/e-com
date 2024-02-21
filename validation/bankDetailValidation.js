const Joi = require("joi");

module.exports = {
  //update bank detail validation
  updateBankDetailValidation: Joi.object({
    name: Joi.string().max(150).optional().messages({
      "string.base": `"name" should be a type of 'text'`,
      "string.empty": `"name" cannot be an empty field`,
      "string.max": `"name" should not exceed 150 characters`,
    }),
    bankName: Joi.string().valid("BOI", "SBI", "HDFC").optional().messages({
      "string.base": `"["BOI", "SBI", "HDFC"]" only these values are allow'`,
      "string.empty": `"bankName" cannot be an empty field`,
    }),
    accountNumber: Joi.string().min(9).max(18).optional().messages({
      "string.empty": `"accountNumber" cannot be an empty field`,
      "string.max": `"accountNumber" should not exceed 150 characters`,
      "string.min": `"accountNumber" should atleast 9 digit`,
    }),
    ifscCode: Joi.string().min(11).max(11).optional().messages({
      "string.base": `"ifscCode" should be a type of 'text'`,
      "string.empty": `"ifscCode" cannot be an empty field`,
      "string.max": `"ifscCode" should not exceed 150 characters`,
      "string.min": `"ifscCode" should atleast 11 character`,
    }),
  }),

  //add bank detail validation
  bankDetailValidation: Joi.object({
    name: Joi.string().max(150).required().messages({
      "string.base": `"name" should be a type of 'text'`,
      "string.empty": `"name" cannot be an empty field`,
      "any.required": `"name" is a required field`,
      "string.max": `"name" should not exceed 150 characters`,
    }),
    bankName: Joi.string().valid("BOI", "SBI", "HDFC").required().messages({
      "string.base": `"["BOI", "SBI", "HDFC"]" only these values are allow'`,
      "string.empty": `"bankName" cannot be an empty field`,
      "any.required": `"bankName" is a required field`,
    }),
    accountNumber: Joi.string().min(9).max(18).required().messages({
      "string.empty": `"accountNumber" cannot be an empty field`,
      "any.required": `"accountNumber" is a required field`,
      "string.max": `"accountNumber" should not exceed 150 characters`,
      "string.min": `"accountNumber" should atleast 9 digit`,
    }),
    ifscCode: Joi.string().min(11).max(11).required().messages({
      "string.base": `"ifscCode" should be a type of 'text'`,
      "string.empty": `"ifscCode" cannot be an empty field`,
      "any.required": `"ifscCode" is a required field`,
      "string.max": `"ifscCode" should not exceed 150 characters`,
      "string.min": `"ifscCode" should atleast 11 character`,
    }),
  }),
};
