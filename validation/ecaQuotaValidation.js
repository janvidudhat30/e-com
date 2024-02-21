const Joi = require("joi");

module.exports = {
  //add eca quota validation
  addEcaQuotaValidation: Joi.object({
    sportApplicationStatus: Joi.string()
      .valid("No", "Yes")
      .required()
      .messages({
        "any.required": `"applyStatus" is a required field`,
        "string.base": `["No", "Yes"] only these values are allow`,
      }),
    curricularActivity: Joi.string().max(250).optional().messages({
      "string.empty": `"curricularActivity" cannot be an empty field`,
      "string.max": `"curricularActivity" should not exceed 250 character `,
    }),
    subCategory: Joi.string().max(250).optional().messages({
      "string.empty": `"subCategory" cannot be an empty field`,
      "string.max": `"subCategory" should not exceed 250 character `,
    }),
  }),

  //update sport quota validation
  updateEcaQuotaValidation: Joi.object({
    sportApplicationStatus: Joi.string()
      .valid("No", "Yes")
      .optional()
      .messages({
        "string.base": `["No", "Yes"] only these values are allow`,
      }),
    curricularActivity: Joi.string().max(250).optional().messages({
      "string.empty": `"curricularActivity" cannot be an empty field`,
      "string.max": `"curricularActivity" should not exceed 250 character `,
    }),
    subCategory: Joi.string().max(250).optional().messages({
      "string.empty": `"subCategory" cannot be an empty field`,
      "string.max": `"subCategory" should not exceed 250 character `,
    }),
  }),
};

function ActivityValidation(user_val) {
  const schema = Joi.object({
    sportApplicationStatus: Joi.string().valid("Yes").required().messages({
      "string.base": `["Yes"] only these values are allow`,
    }),
    curricularActivity: Joi.string().max(250).required().messages({
      "string.empty": `"curricularActivity" cannot be an empty field`,
      "any.required": `"curricularActivity" is a required field`,
      "string.max": `"curricularActivity" should not exceed 250 character `,
    }),
    subCategory: Joi.string().max(250).required().messages({
      "string.empty": `"subCategory" cannot be an empty field`,
      "any.required": `"subCategory" is a required field`,
      "string.max": `"subCategory" should not exceed 250 character `,
    }),
  });
  return schema.validate(user_val);
}

module.exports.ActivityValidation = ActivityValidation;
