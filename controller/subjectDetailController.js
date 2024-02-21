const { Subject } = require("../models/subjectsDetailModel");
const config = require("../utils/config");
const logger = require("../loggers/logger");
const response = require("../helper/responseMessage");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");

module.exports = {
  //add subject details
  addSubjectDetails: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const {
        subject,
        maxTheoryMarks,
        maxStudentTheoryMarks,
        maxPracticalMarks,
        maxStudentPracticalMarks,
        maxTotal,
        maxStudentTotal,
      } = req.body;
      let findUser = await Subject.findOne({
        applicationNo,
      });

      if (findUser) {
        next(
          new GeneralError(
            `Subject detail  ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        const subjectDetail = new Subject({
          applicationNo,
          subject,
          maxTheoryMarks,
          maxStudentTheoryMarks,
          maxPracticalMarks,
          maxStudentPracticalMarks,
          maxTotal,
          maxStudentTotal,
        });
        
        let result = await subjectDetail.save();

        if (result) {
          next(
            new GeneralResponse(
              `Subject detail ${response.ADDED_SUCCESSFULLY}`,
              undefined,
              config.HTTP_CREATED
            )
          );
        }
      }
    } catch (err) {
      next(
        new GeneralError(
          response.SERVER_ERROR + err,
          undefined,
          config.HTTP_SERVER_ERROR
        )
      );
    }
  },

  //update subject detail
  updateSubjectDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const {
        subject,
        maxTheoryMarks,
        maxStudentTheoryMarks,
        maxPracticalMarks,
        maxStudentPracticalMarks,
        maxTotal,
        maxStudentTotal,
      } = req.body;

      const updateData = {
        subject,
        maxTheoryMarks,
        maxStudentTheoryMarks,
        maxPracticalMarks,
        maxStudentPracticalMarks,
        maxTotal,
        maxStudentTotal,
      };

      const updateSubjectDetail = await Subject.updateOne(
        { applicationNo },
        updateData
      );

      if (updateSubjectDetail.modifiedCount) {
        next(
          new GeneralResponse(
            `Subject Detail ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      }
      else
      {
        next(
          new GeneralError(
            `Subject Detail ${response.NOT_UPDATED}`,
            undefined,
            config.HTTP_SERVER_ERROR
          )
        );
      }
    } catch (err) {
      next(
        new GeneralError(
          response.SERVER_ERROR + err,
          undefined,
          config.HTTP_SERVER_ERROR
        )
      );
    }
  },
  
  //view subject detail
  viewSubjectDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      let findDetail = await Subject.findOne({ applicationNo });

      if (!findDetail) {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        next(new GeneralResponse(findDetail, undefined, config.HTTP_CREATED));
      }
    } catch (err) {
      next(
        new GeneralError(
          response.SERVER_ERROR + err,
          undefined,
          config.HTTP_SERVER_ERROR
        )
      );
    }
  },
};
