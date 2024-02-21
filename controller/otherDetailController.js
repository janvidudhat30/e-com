const { OtherDetail } = require("../models/otherDetailModel");
const config = require("../utils/config");
const logger = require("../loggers/logger");
const response = require("../helper/responseMessage");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");

module.exports = {
  //add ward quota detail
  addOtherDetail: async (req, res, next) => {
    try {
      const { enrollementStatus, vaccinationStatus } = req.body;
      const applicationNo = req.user.applicationNo;

      let findUser = await OtherDetail.findOne({
        applicationNo,
      });

      if (findUser) {
        next(
          new GeneralError(
            `Other detail  ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        let otherDetail = new OtherDetail({
          applicationNo,
          vaccinationStatus,
          enrollementStatus,
        });

        let result = await otherDetail.save();

        if (result) {
          next(
            new GeneralResponse(
              `Other detail ${response.ADDED_SUCCESSFULLY}`,
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

  //view other detail
  viewOtherDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      let findDetail = await OtherDetail.findOne({ applicationNo });

      if (!findDetail) {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {;
        next(new GeneralResponse(findDetail, undefined, config.HTTP_CREATED));
      }
    } catch (err) {
      logger.error(response.ERROR, err);
    }
  },
  
  //update other detail
  updateOtherDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const {vaccinationStatus,enrollementStatus}=req.body;
      const updateData = {
        vaccinationStatus,
        enrollementStatus
      };

      const userUpdate = await OtherDetail.updateOne(
        { applicationNo },
        updateData
      );

      if (userUpdate.modifiedCount) {
        next(
          new GeneralResponse(
            `Other detail ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      } else {
        next(
          new GeneralError(
            `Other detail ${response.NOT_UPDATED}`,
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
};
