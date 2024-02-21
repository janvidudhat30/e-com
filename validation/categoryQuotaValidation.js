const Joi = require("joi");

module.exports = {
  //add category quota validation
  addCategoryQuotaValidation: Joi.object({
    pwbdCategory: Joi.string().max(150).required().messages({
      "string.base": `"pwbdCategory" should be a type of 'text'`,
      "string.empty": `"pwbdCategory" cannot be an empty field`,
      "any.required": `"pwbdCategory" is a required field`,
      "string.max": `"pwbdCategory" should not exceed 50 characters`,
    }),
    migrant: Joi.string().max(150).required().messages({
      "string.base": `"migrant" should be a type of 'text'`,
      "string.empty": `"migrant" cannot be an empty field`,
      "any.required": `"migrant" is a required field`,
      "string.max": `"migrant" should not exceed 50 characters`,
    }),
    cwCategory: Joi.string().max(150).required().messages({
      "string.base": `"CWCategory" should be a type of 'text'`,
      "string.empty": `"CWCategory" cannot be an empty field`,
      "any.required": `"CWCategory" is a required field`,
      "string.max": `"CWCategory" should not exceed 50 characters`,
    }),
    specialScholarship: Joi.string()
      .valid("Government", "Private")
      .required()
      .messages({
        "any.required": `"specialScholarship" is a required field`,
        "string.base": `['Government','Private'] only these values are allow`,
      }),
    studentScholarship: Joi.string()
      .valid("Not Applicable", "National Means cum Merit Scholarship NMMSS")
      .required()
      .messages({
        "any.required": `"studentScholarship" is a required field`,
        "string.base": `['Not Applicable','National Means cum Merit Scholarship NMMSS'] only these values are allow`,
      }),
    identityProof: Joi.string()
      .valid("Not Applicable", "PanCard", "Adhar Card")
      .required()
      .messages({
        "any.required": `"identityProof" is a required field`,
        "string.base": `["Not Applicable","PanCard","Adhar Card"] only these values are allow`,
      }),
  }),

  //update category quota validation
  updateCategoryQuotaValidation: Joi.object({
    pwbdCategory: Joi.string().max(150).optional().messages({
      "string.base": `"pwbdCategory" should be a type of 'text'`,
      "string.max": `"pwbdCategory" should not exceed 50 characters`,
    }),
    migrant: Joi.string().max(150).optional().messages({
      "string.base": `"migrant" should be a type of 'text'`,
      "string.max": `"migrant" should not exceed 50 characters`,
    }),
    cwCategory: Joi.string().max(150).optional().messages({
      "string.base": `"CWCategory" should be a type of 'text'`,
      "string.empty": `"CWCategory" cannot be an empty field`,
      "string.max": `"CWCategory" should not exceed 50 characters`,
    }),
    specialScholarship: Joi.string()
      .valid("Government", "Private")
      .optional()
      .messages({
        "string.base": `['Government','Private'] only these values are allow`,
      }),
    studentScholarship: Joi.string()
      .valid("Not Applicable", "National Means cum Merit Scholarship NMMSS")
      .optional()
      .messages({
        "string.base": `['Not Applicable','National Means cum Merit Scholarship NMMSS'] only these values are allow`,
      }),
    identityProof: Joi.string()
      .valid("Not Applicable", "PanCard", "Adhar Card")
      .optional()
      .messages({
        "string.base": `["Not Applicable","PanCard","Adhar Card"] only these values are allow`,
      }),
  }),
};
