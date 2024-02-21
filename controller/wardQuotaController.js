const { WardQuota } = require("../models/wardQuotaDetailModel");
const config = require("../utils/config");
const response = require("../helper/responseMessage");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");

module.exports = {
  //add ward quota detail
  addWardQuotaDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const { occupation } = req.body;
      let findUser = await WardQuota.findOne({
        applicationNo,
      });

      if (findUser) {
        next(
          new GeneralError(
            `Ward quota  ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        let quotaDetail = new WardQuota({
          applicationNo,
          occupation,
        });

        let result = await quotaDetail.save();

        if (result) {
          next(
            new GeneralResponse(
              `Ward Quota Detail ${response.ADDED_SUCCESSFULLY}`,
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

  //view ward quota detail
  viewWardQuota: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      let findDetail = await WardQuota.findOne({ applicationNo });

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
  //update ward quota detail
  updateWardQuotaDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const { occupation } = req.body;
      const updateData = {
        occupation,
      };

      const userUpdate = await WardQuota.updateOne(
        { applicationNo },
        updateData
      );

      if (userUpdate.modifiedCount) {
        next(
          new GeneralResponse(
            `Ward Quota ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      } else {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
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
