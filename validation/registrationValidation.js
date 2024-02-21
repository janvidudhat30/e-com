const Joi = require("joi").extend(require("@joi/date"));
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

module.exports = {
  //registration validation
  registrationValidation: Joi.object({
    applicationNo: Joi.string().max(250).required().messages({
      "string.empty": `"applicationNo" cannot be an empty field`,
      "any.required": `"applicationNo" is a required field`,
      "string.max": `"applicationNo" should not exceed 250 character `,
    }),
    dob: Joi.date().format("YYYY-MM-DD").utc().required().messages({
      "string.empty": `"dob" cannot be an empty field`,
      "any.required": `"dob" is a required field`,
      "string.base": `dob should be in yyyy-mm-dd format`,
    }),
    
  }),

  //update password validation
  updatePasswordValidation: Joi.object({
    otp: Joi.required().messages({
      "string.base": `"otp is required'`,
    }),
    email: Joi.string().max(150).required().email().messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `"email" is a required field`,
      "string.max": `maximum length of "email" is 50 `,
    }),
    password: joiPassword
      .string()
      .min(8)
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .required()
      .messages({
        "string.base": `"password" should contain atleast 1 uppercase,1 lowercase,1 digit'`,
        "string.empty": `"password" cannot be an empty field`,
        "string.min": `"password" should have a minimum length of 8 `,
        "any.required": `"password" is a required field`,
      }),
    confirmpassword: Joi.valid(Joi.ref("password")).required().messages({
      "string.base": `"confirm password" and password should be same'`,
    }),
  }),

  //Login validation validation
  loginValidation: Joi.object({
    applicationNo: Joi.string().max(250).required().messages({
      "string.empty": `"applicationNo" cannot be an empty field`,
      "any.required": `"applicationNo" is a required field`,
      "string.max": `"applicationNo" should not exceed 250 character `,
    }),
    password: joiPassword
      .string()
      .min(8)
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .required()
      .messages({
        "string.base": `"password" should contain atleast 1 uppercase,1 lowercase,1 digit'`,
        "string.empty": `"password" cannot be an empty field`,
        "string.min": `"password" should have a minimum length of 8 `,
        "any.required": `"password" is a required field`,
      }),
  }),
};
