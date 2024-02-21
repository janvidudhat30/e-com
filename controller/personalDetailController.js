const { PersonalDetail } = require("../models/personalDetailModel");
const { GeneralError } = require("../utils/error");
const config = require("../utils/config");
const { GeneralResponse } = require("../utils/response");
const logger = require("../loggers/logger");
const response = require("../helper/responseMessage");

module.exports = {
  //add personal detail
  addPersonalData: async (req, res, next) => {
    try {
      const {
        fullname,
        dob,
        gender,
        citizone,
        category,
        minority,
        email,
        phoneNo,
        state,
        alternativeEmail,
        alternativePhoneNo,
      } = req.body;
     

      const applicationNo = req.user.applicationNo;
      let findUser = await PersonalDetail.findOne({
        applicationNo,
      });

      if (findUser) {
        next(
          new GeneralError(
            `Personal  ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        const personalData = new PersonalDetail({
          applicationNo,
          fullname,
          dob,
          gender,
          citizone,
          category,
          minority,
          email,
          phoneNo,
          state,
          alternativeEmail,
          alternativePhoneNo,
        });
        let result = await personalData.save();

        if (result) {
          next(
            new GeneralResponse(
              `Personal detail${response.ADDED_SUCCESSFULLY}`,
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

  //view Personal Detail
  viewPersonalData: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      let findDetail = await PersonalDetail.findOne({ applicationNo });

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

  //update personal Detail
  updatePersonalData: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const {
        fullname,
        dob,
        gender,
        citizone,
        category,
        minority,
        email,
        phoneNo,
        state,
        alternativeEmail,
        alternativePhoneNo,
      } = req.body;

      const updateData = {
        fullname,
        dob,
        gender,
        citizone,
        category,
        minority,
        email,
        phoneNo,
        state,
        alternativeEmail,
        alternativePhoneNo,
      };
      const userUpdate = await PersonalDetail.updateOne(
        { applicationNo },
        updateData
      );

      if (userUpdate.modifiedCount) {
        next(
          new GeneralResponse(
            `Personal detail ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      } else {
        next(
          new GeneralError(
            `Personal detail ${response.NOT_UPDATED}`,
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
