const Joi = require("joi");

module.exports = {
  //add subject detail validation
  addSubjectDetailValidation: Joi.object({
    subject: Joi.string().max(250).required().messages({
      "string.empty": `"Subject" cannot be an empty field`,
      "any.required": `"Subject" is a required field`,
      "string.max": `"Subject" should not exceed 250 character `,
    }),
    maxTheoryMarks: Joi.number().max(100).required().messages({
      "number.empty": `"maxTheoryMarks" cannot be an empty field`,
      "any.required": `"maxTheoryMarks" is a required field`,
      "number.max": `"maxTheoryMarks" should not exceed value 100 `,
    }),
    maxStudentTheoryMarks: Joi.number().max(100).required().messages({
      "number.empty": `"maxStudentTheoryMarks" cannot be an empty field`,
      "any.required": `"maxStudentTheoryMarks" is a required field`,
      "number.max": `"maxStudentTheoryMarks" should not exceed value 100 `,
    }),
    maxPracticalMarks: Joi.number().max(100).required().messages({
      "number.empty": `"maxPracticalMarks" cannot be an empty field`,
      "any.required": `"maxPracticalMarks" is a required field`,
      "number.max": `"maxPracticalMarks" should not exceed value 100 `,
    }),
    maxStudentPracticalMarks: Joi.number().max(100).required().messages({
      "number.empty": `"maxStudentPracticalMarks" cannot be an empty field`,
      "any.required": `"maxStudentPracticalMarks" is a required field`,
      "number.max": `"maxStudentPracticalMarks" should not exceed value 100 `,
    }),
    maxTotal: Joi.number().max(200).required().messages({
      "number.empty": `"maxTotal" cannot be an empty field`,
      "any.required": `"maxTotal" is a required field`,
      "number.max": `"maxTotal" should not exceed value 100 `,
    }),
    maxStudentTotal: Joi.number().max(200).required().messages({
      "number.empty": `"maxStudentTotal" cannot be an empty field`,
      "any.required": `"maxStudentTotal" is a required field`,
      "number.max": `"maxStudentTotal" should not exceed value 100 `,
    }),
  }),
  //update subject detail validation
  updateSubjectDetailValidation: Joi.object({
    subject: Joi.string().max(250).optional().messages({
      "string.empty": `"Subject" cannot be an empty field`,
      "string.max": `"Subject" should not exceed 250 character `,
    }),
    maxTheoryMarks: Joi.number().max(100).optional().messages({
      "number.empty": `"maxTheoryMarks" cannot be an empty field`,
      "number.max": `"maxTheoryMarks" should not exceed value 100 `,
    }),
    maxStudentTheoryMarks: Joi.number().max(100).optional().messages({
      "number.empty": `"maxStudentTheoryMarks" cannot be an empty field`,
      "number.max": `"maxStudentTheoryMarks" should not exceed value 100 `,
    }),
    maxPracticalMarks: Joi.number().max(100).optional().messages({
      "number.empty": `"maxPracticalMarks" cannot be an empty field`,
      "number.max": `"maxPracticalMarks" should not exceed value 100 `,
    }),
    maxStudentPracticalMarks: Joi.number().max(100).optional().messages({
      "number.empty": `"maxStudentPracticalMarks" cannot be an empty field`,
      "number.max": `"maxStudentPracticalMarks" should not exceed value 100 `,
    }),
    maxTotal: Joi.number().max(200).optional().messages({
      "number.empty": `"maxTotal" cannot be an empty field`,
      "number.max": `"maxTotal" should not exceed value 100 `,
    }),
    maxStudentTotal: Joi.number().max(200).optional().messages({
      "number.empty": `"maxStudentTotal" cannot be an empty field`,
      "number.max": `"maxStudentTotal" should not exceed value 100 `,
    }),
  }),
};
