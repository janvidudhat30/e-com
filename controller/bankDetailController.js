const { BankDetail } = require("../models/bankDetailModel");
const config = require("../utils/config");
const response = require("../helper/responseMessage");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");

module.exports = {
  //add additional detail
  addBankDetail: async (req, res, next) => {
    try {
      const { name, bankName, ifscCode, accountNumber } = req.body;
      const applicationNo = req.user.applicationNo;

      let findUser = await BankDetail.findOne({
        applicationNo,
      });

      if (findUser) {
        next(
          new GeneralError(
            `Bank detail   ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        let bankDetail = new BankDetail({
          applicationNo,
          name,
          accountNumber,
          ifscCode,
          bankName,
        });
        let result = await bankDetail.save();

        if (result) {
          next(
            new GeneralResponse(
              `Bank detail ${response.ADDED_SUCCESSFULLY}`,
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

  //view Bank detail
  viewBankDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      let findDetail = await BankDetail.findOne({ applicationNo });

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
  
  //update bank detail
  updateBankDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const { name, bankName, ifscCode, accountNumber } = req.body;
      const updateData = {
        name,
        bankName,
        ifscCode,
        accountNumber,
      };
      const updateBankDetail = await BankDetail.updateOne(
        { applicationNo },
        updateData
      );

      if (updateBankDetail.modifiedCount) {
        next(
          new GeneralResponse(
            `Bank detail ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      }else{
        next(
          new GeneralError(
            `Bank detail ${response.NOT_UPDATED}`,
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
