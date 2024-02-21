const { Country } = require("../models/countryModel");
const { State } = require("../models/stateModel");
const { City } = require("../models/cityModel");
const { Address } = require("../models/addressModel");
const config = require("../utils/config");
const response = require("../helper/responseMessage");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");

module.exports = {
  //view Country
  viewCountry: async (req, res, next) => {
    try {
      const showCountry = await Country.find();

      if (showCountry.length == 0) {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
            undefined,
            config.HTTP_NOT_FOUND
          )
        );
      } else {
        next(new GeneralResponse(showCountry, undefined, config.HTTP_CREATED));
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

  //view State
  viewState: async (req, res, next) => {
    try {
      const findData = await State.aggregate([
        {
          $match: {
            countryId: req.params.countryid,
          },
        },
        {
          $addFields: {
            countryName: {
              $toObjectId: "$countryId",
            },
          },
        },
        {
          $lookup: {
            from: "countries",
            localField: "countryName",
            foreignField: "_id",
            as: "countryData",
          },
        },
        {
          $unwind: "$countryData",
        },
        {
          $project: {
            _id: 0,
            state: 1,
            countryName: "$countryData.country",
          },
        },
      ]);

      if (findData) {
        next(new GeneralResponse(findData, undefined, config.HTTP_CREATED));
      } else {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
            undefined,
            config.HTTP_ACCEPTED
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

  //view city
  viewCity: async (req, res, next) => {
    try {
      const findData = await City.aggregate([
        {
          $match: {
            stateId: req.params.stateid,
            countryId: req.params.countryid,
          },
        },
        {
          $addFields: {
            countryName: {
              $toObjectId: "$countryId",
            },
            stateName: {
              $toObjectId: "$stateId",
            },
          },
        },
        {
          $lookup: {
            from: "countries",
            localField: "countryName",
            foreignField: "_id",
            as: "countryData",
          },
        },
        {
          $unwind: "$countryData",
        },
        {
          $lookup: {
            from: "states",
            localField: "stateName",
            foreignField: "_id",
            as: "stateData",
          },
        },
        {
          $unwind: "$stateData",
        },
        {
          $project: {
            _id: 0,
            city: 1,
            countryName: "$countryData.country",
            stateName: "$stateData.state",
          },
        },
      ]);

      if (findData) {
        next(new GeneralResponse(findData, undefined, config.HTTP_CREATED));
      } else {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
            undefined,
            config.HTTP_ACCEPTED
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

  //add address
  addAddress: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const { addressLine1, addressLine2, country, city, state, pincode } =
        req.body;

      let findUser = await Address.findOne({
        applicationNo,
      });

      if (findUser) {
        next(
          new GeneralError(
            `Address detail  ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        const addressDetail = new Address({
          applicationNo,
          addressLine1,
          addressLine2,
          country,
          city,
          state,
          pincode,
        });
        let result = await addressDetail.save();

        if (result) {
          next(
            new GeneralResponse(
              `Address detail${response.ADDED_SUCCESSFULLY}`,
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

  //update address
  updateAddress: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const { addressLine1, addressLine2, country, city, state, pincode } =
        req.body;
      const updateData = {
        addressLine1,
        addressLine2,
        country,
        city,
        state,
        pincode,
      };
      const updateAddress = await Address.updateOne(
        { applicationNo },
        updateData
      );

      if (updateAddress.modifiedCount) {
        next(
          new GeneralResponse(
            `Address Detail  ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      } else {
        next(
          new GeneralError(
            `Address Detail  ${response.NOT_UPDATED}`,
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

  //view address
  viewAddress: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      let findDetail = await Address.findOne({ applicationNo });

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
