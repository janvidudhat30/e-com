const Joi = require("joi");

module.exports = {
  //add sport quota validation
  addSportQuotaValidation: Joi.object({
    applyStatus: Joi.string().valid("No", "Yes").required().messages({
      "any.required": `"applyStatus" is a required field`,
      "string.base": `["No", "Yes"] only these values are allow`,
    }),
    game: Joi.string().max(250).optional().messages({
      "string.empty": `"game" cannot be an empty field`,
      "string.max": `"game" should not exceed 250 character `,
    }),
  }),

  //update sport quota validation
  updateSportQuotaValidation: Joi.object({
    applyStatus: Joi.string().valid("No", "Yes").optional().messages({
      "string.base": `["No", "Yes"] only these values are allow`,
    }),
    game: Joi.string().max(250).optional().messages({
      "string.empty": `"game" cannot be an empty field`,
      "string.max": `"game" should not exceed 250 character `,
    }),
  }),
};

function gameValidation(user_val) {
  const schema = Joi.object({
    applyStatus: Joi.string().valid("Yes").required().messages({
      "string.base": `["Yes"] only these values are allow`,
    }),
    game: Joi.string().max(250).required().messages({
      "string.empty": `"game" cannot be an empty field`,
      "any.required": `"game" is a required field`,
      "string.max": `"game" should not exceed 250 character `,
    }),
  });
  return schema.validate(user_val);
}

module.exports.gameValidation = gameValidation;
