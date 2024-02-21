const Joi = require("joi");

module.exports = {
  //add ward quota validation
  addWardQuotaValidation: Joi.object({
    occupation: Joi.string()
      .valid("Not Applicable", "Yes")
      .required()
      .messages({
        "any.required": `"occupation" is a required field`,
        "string.base": `[Not Applicable,Yes] only these values are allow`,
      }),
  }),

  //update ward quota validation
  updateWardQuotaValidation: Joi.object({
    occupation: Joi.string()
      .valid("Not Applicable", "Yes")
      .optional()
      .messages({
        "string.base": `[Not Applicable,Yes] only these values are allow`,
      }),
  }),
};
