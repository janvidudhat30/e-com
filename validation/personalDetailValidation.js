const Joi = require("joi").extend(require("@joi/date"));
module.exports = {
  //add personal detail validation
  addPersonalDetailValidation: Joi.object({
    fullname: Joi.string().max(150).required().messages({
      "string.base": `"name" should be a type of 'text'`,
      "string.empty": `"name" cannot be an empty field`,
      "any.required": `"name" is a required field`,
      "string.max": `maximum length of "name" is 50 `,
    }),
    dob: Joi.date().format("YYYY-MM-DD").utc().required().messages({
      "string.empty": `"dob" cannot be an empty field`,
      "any.required": `"dob" is a required field`,
      "string.base": `dob should be in yyyy-mm-dd format`,
    }),
    gender: Joi.string().valid("Male", "Female", "Other").required().messages({
      "any.required": `"gender" is a required field`,
      "string.base": `[Male,Female,Other] only these values are allow`,
    }),
    citizone: Joi.string().valid("Yes", "No").required().messages({
      "any.required": `"citizone" is a required field`,
      "string.base": `[Yes,No] only these values are allow`,
    }),
    category: Joi.string()
      .valid("UR", "OBC-NCL", "SC", "ST")
      .required()
      .messages({
        "any.required": `"category" is a required field`,
        "string.base": `[UR,OBC-NCL,SC,ST] only these values are allow`,
      }),
    minority: Joi.string()
      .valid("Sikh Minority", "Christian Minority")
      .required()
      .messages({
        "any.required": `"minority" is a required field`,
        "string.base": `[Sikh Minority,Christian Minority] only these values are allow`,
      }),
    email: Joi.string().max(150).required().email().messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `"email" is a required field`,
      "string.max": `maximum length of "email" is 50 `,
    }),
    alternativeEmail: Joi.string().max(150).email().optional().messages({
      "string.max": `maximum length of "email" is 50 `,
    }),
    phoneNo: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.empty": `"phoneNo" cannot be an empty field`,
        "any.required": `"phoneNo" is a required field`,
        "string.pattern.base": `Phone number must have 10 digits.`,
      }),
    alternativePhoneNo: Joi.string()
      .regex(/^[0-9]{10}$/)
      .optional()
      .messages({
        "string.pattern.base": `Phone number must have 10 digits.`,
      }),
    state: Joi.string().max(50).required().messages({
      "string.base": `"state" should be a type of 'text'`,
      "string.empty": `"state" cannot be an empty field`,
      "any.required": `"state" is a required field`,
      "string.max": `maximum length of "state" is 50 `,
    }),
  }),
  
  //update personal detail validation
  updatePersonalDetailValidation: Joi.object({
    fullname: Joi.string().max(150).optional().messages({
      "string.base": `"name" should be a type of 'text'`,
      "string.max": `maximum length of "name" is 50 `,
    }),
    dob: Joi.date().format("YYYY-MM-DD").utc().optional().messages({
      "string.base": `dob should be in yyyy-mm-dd format`,
    }),
    gender: Joi.string().valid("Male", "Female", "Other").optional().messages({
      "string.base": `[Male,Female,Other] only these values are allow`,
    }),
    citizone: Joi.string().valid("Yes", "No").optional().messages({
      "string.base": `[Yes,No] only these values are allow`,
    }),
    category: Joi.string()
      .valid("UR", "OBC-NCL", "SC", "ST")
      .optional()
      .messages({
        "string.base": `[UR,OBC-NCL,SC,ST] only these values are allow`,
      }),
    minority: Joi.string()
      .valid("Sikh Minority", "Christian Minority")
      .optional()
      .messages({
        "string.base": `[Sikh Minority,Christian Minority] only these values are allow`,
      }),
    email: Joi.string().max(150).optional().email().messages({
      "string.max": `maximum length of "email" is 50 `,
    }),
    alternativeEmail: Joi.string().max(150).email().optional().messages({
      "string.max": `maximum length of "email" is 50 `,
    }),
    phoneNo: Joi.string()
      .regex(/^[0-9]{10}$/)
      .optional()
      .messages({
        "string.pattern.base": `Phone number must have 10 digits.`,
      }),
    alternativePhoneNo: Joi.string()
      .regex(/^[0-9]{10}$/)
      .optional()
      .messages({
        "string.pattern.base": `Phone number must have 10 digits.`,
      }),
    state: Joi.string().max(50).optional().messages({
      "string.base": `"state" should be a type of 'text'`,
      "string.max": `maximum length of "state" is 50 `,
    }),
  }),
};
