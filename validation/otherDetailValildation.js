const Joi = require("joi");

module.exports = {
  //add other detail validation
  addOtherDetailValidation: Joi.object({
    vaccinationStatus: Joi.string()
      .valid("Not Applicable", "Dose 1", "Dose 2", "Dose 3")
      .required()
      .messages({
        "any.required": `"vaccinationStatus" is a required field`,
        "string.base": `["Not Applicable", "Dose 1","Dose 2","Dose 3"] only these values are allow`,
      }),
    enrollementStatus: Joi.string().valid("Yes", "No").optional().messages({
      "string.base": `["Yes","No"] only these values are allow`,
    }),
  }),
  
  //update other detail validation
  updateOtherDetailValidation: Joi.object({
    vaccinationStatus: Joi.string()
      .valid("Not Applicable", "Dose 1", "Dose 2", "Dose 3")
      .optional()
      .messages({
        "string.base": `["Not Applicable", "Dose 1","Dose 2","Dose 3"] only these values are allow`,
      }),
    enrollementStatus: Joi.string().valid("Yes", "No").optional().messages({
      "string.base": `["Yes","No"] only these values are allow`,
    }),
  }),
};
