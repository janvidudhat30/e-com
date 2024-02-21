const { SportQuota } = require("../models/sportQuotaModel");
const config = require("../utils/config");
const response = require("../helper/responseMessage");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const validation = require("../validation/sportQuotaValidation");
module.exports = {
  //add sport quota detail
  addSportQuotaDetail: async (req, res, next) => {
    try {
      const { applyStatus, game } = req.body;
      if (applyStatus === "Yes") {
        const { error } = validation.gameValidation(req.body);
        if (error) {
          return res.status(400).send(error.details[0].message);
        }
      }
      const applicationNo = req.user.applicationNo;

      let findUser = await SportQuota.findOne({
        applicationNo,
      }).exec();

      if (findUser) {
        next(
          new GeneralError(
            `Sport quota detail  ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        let sportDetail;
        if (applyStatus === "No") {
           sportDetail = new SportQuota({
            applicationNo,
            applyStatus,
          });
        }

        if (applyStatus === "Yes") {
           sportDetail = new SportQuota({
            applicationNo,
            applyStatus,
            game,
          });
        }
        const result = await sportDetail.save();

        if (result) {
          next(
            new GeneralResponse(
              `Sport detail ${response.ADDED_SUCCESSFULLY}`,
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

  //update sport quota detail
  updateSportQuotaDetail: async (req, res, next) => {
    const applicationNo = req.user.applicationNo;
    let updateData;
    if (req.body.applyStatus === "No") {
      updateData = {
        applyStatus: req.body.applyStatus,
        game: null,
      };
    }
    if (req.body.applyStatus === "Yes") {
      const { error } = validation.gameValidation(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      updateData = {
        applyStatus: req.body.applyStatus,
        game: req.body.game,
      };
    }
    const userUpdate = await SportQuota.updateOne(
      { applicationNo },
      updateData
    ).exec();
    if (userUpdate.modifiedCount) {
      next(
        new GeneralResponse(
          `Sport Quota detail ${response.UPDATE_DATA}`,
          undefined,
          config.HTTP_CREATED
        )
      );
    } else {
      next(
        new GeneralError(
          `Sport Quota detail ${response.NOT_UPDATED}`,
          undefined,
          config.HTTP_ACCEPTED
        )
      );
    }
  },

  //view sport quota detail
  viewSportDetail: async (req, res, next) => {
    try {
      const findData = await SportQuota.aggregate([
        {
          $match: {
            applicationNo: req.user.applicationNo,
          },
        },
        {
          $addFields: {
            gameId: {
              $toObjectId: "$game",
            },
          },
        },
        {
          $lookup: {
            from: "games",
            localField: "gameId",
            foreignField: "_id",
            as: "gameData",
          },
        },
        {
          $unwind: "$gameData",
        },

        {
          $project: {
            _id: 0,
            applicationNo: 1,
            applyStatus: 1,
            game: "$gameData.game",
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
};
