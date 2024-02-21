const { FamilyDetail } = require("../models/familyDetailModel");
const logger = require("../loggers/logger");
const config = require("../utils/config");
const { GeneralError } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");
const response = require("../helper/responseMessage");

module.exports = {
  //add family data
  addFamilyData: async (req, res, next) => {
    try {
      const {
        mothername,
        motherOccupation,
        motherOfficeAddress,
        motherPhoneNo,
        fathername,
        fatherOccupation,
        fatherPhoneNo,
        fatherOfficeAddress,
      } = req.body;

      let applicationNo = req.user.applicationNo;

      let findUser = await FamilyDetail.findOne({
        applicationNo,
      });

      if (findUser) {
        next(
          new GeneralError(
            `Family detail ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        const familyData = new FamilyDetail({
          applicationNo,
          mothername,
          motherOccupation,
          motherOfficeAddress,
          motherPhoneNo,
          fathername,
          fatherOccupation,
          fatherOfficeAddress,
          fatherPhoneNo,
        });

        const result = await familyData.save();
        if (result) {
          next(
            new GeneralResponse(
              `Family detail ${response.ADDED_SUCCESSFULLY}`,
              undefined,
              config.HTTP_CREATED
            )
          );
        }
      }
    } catch (err) {
      next(
        new GeneralError(
          response.SERVER_ERROR,
          undefined,
          config.HTTP_SERVER_ERROR
        )
      );
    }
  },

  //view family Detail
  viewFamilyData: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      let findDetail = await FamilyDetail.findOne({ applicationNo });

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
          response.SERVER_ERROR,
          undefined,
          config.HTTP_SERVER_ERROR
        )
      );
    }
  },

  //update family detail
  updateFamilyData: async (req, res, next) => {
    try {
      const {
        mothername,
        motherOccupation,
        motherOfficeAddress,
        motherPhoneNo,
        fathername,
        fatherOccupation,
        fatherPhoneNo,
        fatherOfficeAddress,
      } = req.body;
      const applicationNo = req.user.applicationNo;
      const updateData = {
        applicationNo,
        mothername,
        motherOccupation,
        motherOfficeAddress,
        motherPhoneNo,
        fathername,
        fatherOccupation,
        fatherOfficeAddress,
        fatherPhoneNo,
      };

      const userUpdate = await FamilyDetail.updateOne(
        { applicationNo },
        updateData
      );

      if (userUpdate.modifiedCount) {
        next(
          new GeneralResponse(
            `Family detail ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      } else {
        next(
          new GeneralError(
            `Family detail ${response.NOT_UPDATED}`,
            undefined,
            config.HTTP_SERVER_ERROR
          )
        );
      }
    } catch (err) {
      next(
        new GeneralError(
          response.SERVER_ERROR,
          undefined,
          config.HTTP_SERVER_ERROR
        )
      );
    }
  },
};
