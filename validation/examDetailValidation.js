const Joi = require("joi");
module.exports = {
  //add exam detail validation
  addExamDetailValidation: Joi.object({
    board: Joi.string().max(150).required().messages({
      "string.base": `"board" should be a type of 'text'`,
      "string.empty": `"board" cannot be an empty field`,
      "any.required": `"board" is a required field`,
      "string.max": `maximum length of "board" is 50 `,
    }),
    resultStatus: Joi.string().valid("Awaited", "Passed").required().messages({
      "any.required": `"resultStatus" is a required field`,
      "string.base": `["Awaited", "Passed"] only these values are allow`,
    }),
    boardRollNo: Joi.string().max(150).required().messages({
      "string.base": `"boardRollNo" should be a type of 'text'`,
      "string.empty": `"boardRollNo" cannot be an empty field`,
      "any.required": `"boardRollNo" is a required field`,
      "string.max": `maximum length of "boardRollNo" is 50 `,
    }),
    passingYear: Joi.string().required().messages({
      "string.base": `"passingYear" should be a type of 'string'`,
      "string.empty": `"passingYear" cannot be an empty field`,
      "any.required": `"passingYear" is a required field`,
    }),
  }),
  
  //update exam detail validation
  updateExamDetailValidation: Joi.object({
    board: Joi.string().max(150).optional().messages({
      "string.base": `"board" should be a type of 'text'`,
      "string.empty": `"board" cannot be an empty field`,
      "string.max": `maximum length of "board" is 50 `,
    }),
    resultStatus: Joi.string().valid("Awaited", "Passed").optional().messages({
      "string.base": `["Awaited", "Passed"] only these values are allow`,
    }),
    boardRollNo: Joi.string().max(150).optional().messages({
      "string.base": `"boardRollNo" should be a type of 'text'`,
      "string.empty": `"boardRollNo" cannot be an empty field`,
      "string.max": `maximum length of "boardRollNo" is 50 `,
    }),
    passingYear: Joi.string().optional().messages({
      "string.base": `"passingYear" should be a type of 'string'`,
      "string.empty": `"passingYear" cannot be an empty field`,
    }),
  }),
};
