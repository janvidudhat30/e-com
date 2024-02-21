const { EcaQuota } = require("../models/ecaQuotaModel");
const { Activity } = require("../models/activityModel");
const config = require("../utils/config");
const response = require("../helper/responseMessage");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const validation = require("../validation/ecaQuotaValidation");

module.exports = {
  //view activities
  viewActivities: async (req, res, next) => {
    try {
      const showActivities = await Activity.find();
      if (showActivities.length === 0) {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        next(
          new GeneralResponse(showActivities, undefined, config.HTTP_CREATED)
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

  //add eca quota detail
  addEcaQuotaDetail: async (req, res, next) => {
    try {
      const { sportApplicationStatus, curricularActivity, subCategory } =
        req.body;
      if (sportApplicationStatus === "Yes") {
        const { error } = validation.ActivityValidation(req.body);
        if (error) {
          return res.status(400).send(error.details[0].message);
        }
      }
      const applicationNo = req.user.applicationNo;

      let findUser = await EcaQuota.findOne({
        applicationNo,
      });

      if (findUser) {
        next(
          new GeneralError(
            `ECA quota detail  ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        let ecaDetail;;
        if (sportApplicationStatus === "No") {
          ecaDetail = new EcaQuota({
            applicationNo,
            sportApplicationStatus,
          });
         
        }
        if (sportApplicationStatus === "Yes") {
          ecaDetail = new EcaQuota({
            applicationNo,
            sportApplicationStatus,
            curricularActivity,
            subCategory,
          });
         
        }

        const result = await ecaDetail.save();

        if (result) {
          next(
            new GeneralResponse(
              `Eca detail ${response.ADDED_SUCCESSFULLY}`,
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

  //update ECA Quota detail
  updateEcaQuotaDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const { sportApplicationStatus, curricularActivity, subCategory } =
        req.body;
        let updateData;
      if (req.body.sportApplicationStatus === "No") {
         updateData = {
          sportApplicationStatus,
          curricularActivity: null,
          subCategory: null,
        };
       
      }
      if (req.body.sportApplicationStatus === "Yes") {
        const { error } = validation.ActivityValidation(req.body);
        if (error) {
          return res.status(400).send(error.details[0].message);
        }
        updateData = {
          sportApplicationStatus,
          curricularActivity,
          subCategory,
        };
       
      }
      const userUpdate = await EcaQuota.updateOne(
        { applicationNo },
        updateData
      ).exec();
      if (userUpdate.modifiedCount) {
        next(
          new GeneralResponse(
            `ECA Quota detail ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      } else {
        next(
          new GeneralError(
            `ECA Quota detail ${response.NOT_UPDATED}`,
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
  
  //view ECA Quota detail
  viewEcaQuotaDetail: async (req, res, next) => {
    try {
      const findData = await EcaQuota.aggregate([
        {
          $match: {
            applicationNo: req.user.applicationNo,
          },
        },
        {
          $addFields: {
            curricularActivityId: {
              $toObjectId: "$curricularActivity",
            },
            subCategoryId: {
              $toObjectId: "$subCategory",
            },
          },
        },
        {
          $lookup: {
            from: "activities",
            localField: "curricularActivityId",
            foreignField: "_id",
            as: "curricularActivityData",
          },
        },
        {
          $unwind: "$curricularActivityData",
        },
        {
          $lookup: {
            from: "activities",
            localField: "subCategoryId",
            foreignField: "_id",
            as: "subCategoryData",
          },
        },
        {
          $unwind: "$subCategoryData",
        },

        {
          $project: {
            _id: 0,
            applicationNo: 1,
            sportApplicationStatus: 1,
            curricularActivity: "$curricularActivityData.activity",
            subCategory: "$subCategoryData.activity",
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
