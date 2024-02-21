const Joi = require("joi");

module.exports = {
  //add additional detail validation
  additionalDetailValidation: Joi.object({
    applyModeBA: Joi.string().valid("Offline", "Online").required().messages({
      "any.required": `"applyModeBA" is a required field`,
      "string.base": `["Offline","Online"] only these values are allow`,
    }),
    applyModeBSC: Joi.string().valid("Offline", "Online").required().messages({
      "any.required": `"applyModeBSC" is a required field`,
      "string.base": `["Offline","Online"] only these values are allow`,
    }),
  }),
  
  //update additional detail validation
  updateAdditionalDetailValidation: Joi.object({
    applyModeBA: Joi.string().valid("Offline", "Online").optional().messages({
      "string.base": `["Offline","Online"] only these values are allow`,
    }),
    applyModeBSC: Joi.string().valid("Offline", "Online").optional().messages({
      "string.base": `["Offline","Online"] only these values are allow`,
    }),
  }),
};
