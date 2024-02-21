const Joi = require("joi");

module.exports = {
  //add additonal detail validation
  addStudentDetailValidation: Joi.object({
    schoolName: Joi.string().max(250).required().messages({
      "string.empty": `"Subject" cannot be an empty field`,
      "any.required": `"Subject" is a required field`,
      "string.max": `"Subject" should not exceed 250 character `,
    }),
    schoolType: Joi.string()
      .valid("Primary", "Secondary", "Higher-Secondary")
      .required()
      .messages({
        "any.required": `"schoolType" is a required field`,
        "string.base": `["Primary", "Secondary", "Higher-Secondary"] only these values are allow`,
      }),
    location: Joi.string()
      .valid(
        "Delhi",
        "Gujarat",
        "Rajasthan",
        "Maharashtra",
        "Punjab",
        "Uttar Pradesh",
        "Madhya Pradesh",
        "West Bengal"
      )
      .required()
      .messages({
        "any.required": `"location" is a required field`,
        "string.base": `["Delhi",
        "Gujarat",
        "Rajasthan",
        "Maharashtra",
        "Punjab",
        "Uttar Pradesh",
        "Madhya Pradesh",
        "West Bengal",] only these values are allow`,
      }),
    medium: Joi.string()
      .valid("Hindi", "English", "Gujarati", "Marathi", "Punjabi")
      .required()
      .messages({
        "any.required": `"location" is a required field`,
        "string.base": `["Hindi", "English", "Gujarati", "Marathi", "Punjabi"] only these values are allow`,
      }),
    stdOfHindi: Joi.number().valid(12, 10, 8, 5).required().messages({
      "any.required": `"location" is a required field`,
      "string.base": `["12, 10, 8, 5"] only these values are allow`,
    }),
  }),
  
  //add additonal detail validation
  updateStudentDetailValidation: Joi.object({
    schoolName: Joi.string().max(250).optional().messages({
      "string.empty": `"Subject" cannot be an empty field`,
      "string.max": `"Subject" should not exceed 250 character `,
    }),
    schoolType: Joi.string()
      .valid("Primary", "Secondary", "Higher-Secondary")
      .optional()
      .messages({
        "string.base": `["Primary", "Secondary", "Higher-Secondary"] only these values are allow`,
      }),
    location: Joi.string()
      .valid(
        "Delhi",
        "Gujarat",
        "Rajasthan",
        "Maharashtra",
        "Punjab",
        "Uttar Pradesh",
        "Madhya Pradesh",
        "West Bengal"
      )
      .optional()
      .messages({
        "string.base": `["Delhi",
        "Gujarat",
        "Rajasthan",
        "Maharashtra",
        "Punjab",
        "Uttar Pradesh",
        "Madhya Pradesh",
        "West Bengal",] only these values are allow`,
      }),
    medium: Joi.string()
      .valid("Hindi", "English", "Gujarati", "Marathi", "Punjabi")
      .optional()
      .messages({
        "string.base": `["Hindi", "English", "Gujarati", "Marathi", "Punjabi"] only these values are allow`,
      }),
    stdOfHindi: Joi.number().valid(12, 10, 8, 5).optional().messages({
      "string.base": `["12, 10, 8, 5"] only these values are allow`,
    }),
  }),
};
