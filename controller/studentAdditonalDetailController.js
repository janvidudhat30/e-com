const {
  StudentAdditionalDetail,
} = require("../models/studentAdditionalDetailModel");
const config = require("../utils/config");
const logger = require("../loggers/logger");
const response = require("../helper/responseMessage");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");

module.exports = {
  //add student additional details
  addStudentAdditionalDetails: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const { schoolName, schoolType, location, medium, stdOfHindi } = req.body;
      let findUser = await StudentAdditionalDetail.findOne({
        applicationNo,
      });

      if (findUser) {
        next(
          new GeneralError(
            `Student detail  ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        const additionalDetail = new StudentAdditionalDetail({
          applicationNo,
          schoolName,
          schoolType,
          location,
          medium,
          stdOfHindi,
        });

        let result = await additionalDetail.save();

        if (result) {
          next(
            new GeneralResponse(
              `Additional detail ${response.ADDED_SUCCESSFULLY}`,
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

  //update student additonal detail
  updateStudentDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const { schoolName, schoolType, location, medium, stdOfHindi } = req.body;
      const updateData = {
        schoolName,
        schoolType,
        location,
        medium,
        stdOfHindi,
      };

      const updateStudentDetail = await StudentAdditionalDetail.updateOne(
        { applicationNo },
        updateData
      );

      if (updateStudentDetail.modifiedCount) {
        next(
          new GeneralResponse(
            `Student Detail ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      } else {
        next(
          new GeneralError(
            `Student Detail ${response.NOT_UPDATED}`,
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

  //view student additional detail
  viewStudentDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      let findDetail = await StudentAdditionalDetail.findOne({ applicationNo });

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
