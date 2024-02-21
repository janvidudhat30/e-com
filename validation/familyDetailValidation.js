const Joi = require("joi");

module.exports = {
  //add family detail validation
  addFamilyDetailValidation: Joi.object({
    mothername: Joi.string().max(50).required().messages({
      "string.base": `"mothername" should be a type of 'text'`,
      "string.empty": `"mothername" cannot be an empty field`,
      "any.required": `"mothername" is a required field`,
      "string.max": `"mothername" should not exceed 50 characters`,
    }),
    motherOccupation: Joi.string()
      .valid("Job", "BusinessWomen", "Store")
      .required()
      .messages({
        "any.required": `"gender" is a required field`,
        "string.base": `[Job,BusinessWomen,Store] only these values are allow`,
      }),
    motherOfficeAddress: Joi.string().max(150).messages({
      "string.max": `"motherOfficeAddress" should not exceed 150 characters`,
    }),
    motherPhoneNo: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base": `"Phone number must have 10 digits."`,
      }),
    fathername: Joi.string().max(50).required().messages({
      "string.base": `"fathername" should be a type of 'text'`,
      "string.empty": `"fathername" cannot be an empty field`,
      "any.required": `"fathername" is a required field`,
      "string.max": `"fathername" should not exceed 50 characters`,
    }),
    fatherOccupation: Joi.string()
      .valid("Job", "BusinessWomen", "Store")
      .required()
      .messages({
        "any.required": `"gender" is a required field`,
        "string.base": `[Job,BusinessWomen,Store] only these values are allow`,
      }),
    fatherOfficeAddress: Joi.string().max(150).messages({
      "string.max": `"fatherOfficeAddress" should not exceed 150 characters`,
    }),
    fatherPhoneNo: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base": `"Phone number must have 10 digits."`,
      }),
  }),
  
  //update family detail validation
  updateFamilyDetailValidation: Joi.object({
    mothername: Joi.string().max(50).optional().messages({
      "string.base": `"mothername" should be a type of 'text'`,
      "string.empty": `"mothername" cannot be an empty field`,
      "string.max": `"mothername" should not exceed 50 characters`,
    }),
    motherOccupation: Joi.string()
      .valid("Job", "BusinessWomen", "Store")
      .optional()
      .messages({
        "string.base": `[Job,BusinessWomen,Store] only these values are allow`,
      }),
    motherOfficeAddress: Joi.string().max(150).messages({
      "string.max": `"motherOfficeAddress" should not exceed 150 characters`,
    }),
    motherPhoneNo: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base": `"Phone number must have 10 digits."`,
      }),
    fathername: Joi.string().max(50).optional().messages({
      "string.base": `"fathername" should be a type of 'text'`,
      "string.empty": `"fathername" cannot be an empty field`,
      "string.max": `"fathername" should not exceed 50 characters`,
    }),
    fatherOccupation: Joi.string()
      .valid("Job", "BusinessWomen", "Store")
      .optional()
      .messages({
        "string.base": `[Job,BusinessWomen,Store] only these values are allow`,
      }),
    fatherOfficeAddress: Joi.string().max(150).messages({
      "string.max": `"fatherOfficeAddress" should not exceed 150 characters`,
    }),
    fatherPhoneNo: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base": `"Phone number must have 10 digits."`,
      }),
  }),
};
