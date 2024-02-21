const { AdditionalDetail } = require("../models/additonalDetailModel");
const config = require("../utils/config");
const response = require("../helper/responseMessage");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");

module.exports = {
  //add additional detail
  addDetail: async (req, res, next) => {
    try {
      const { applyModeBA, applyModeBSC } = req.body;
      const applicationNo = req.user.applicationNo;

      let findUser = await AdditionalDetail.findOne({
        applicationNo,
      });

      if (findUser) {
        next(
          new GeneralError(
            `Additonal detail  ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        let additonalDetail = new AdditionalDetail({
          applicationNo,
          applyModeBA,
          applyModeBSC,
        });

        let result = await additonalDetail.save();

        if (result) {
          next(
            new GeneralResponse(
              `Additonal detail ${response.ADDED_SUCCESSFULLY}`,
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

  //view additonal detail
  viewAdditonalDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      let findDetail = await AdditionalDetail.findOne({ applicationNo });

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

  //update student additonal detail
  updateAdditonalDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const { applyModeBA, applyModeBSC } = req.body;
      const updateData = {
        applyModeBA,
        applyModeBSC,
      };

      const userUpdate = await AdditionalDetail.updateOne(
        { applicationNo },
        updateData
      );

      if (userUpdate.modifiedCount) {
        next(
          new GeneralResponse(
            `Additonal detail ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      }
      else
      {
        next(
          new GeneralError(
            `Additonal detail ${response.NOT_UPDATED}`,
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
