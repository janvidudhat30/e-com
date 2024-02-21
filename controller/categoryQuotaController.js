const { pwbdCategory } = require("../models/addPWBDCategoryQuotaModel");
const { Migrant } = require("../models/addMigrantModel");
const { CWCategory } = require("../models/addCwCategoryModel");
const { CategoryQuota } = require("../models/categoryQuotaModel");
const { GeneralError } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");
const config = require("../utils/config");
const response = require("../helper/responseMessage");

module.exports = {
  //view pwbd category
  viewPwbdCategory: async (req, res, next) => {
    try {
      const showPwbdCategory = await pwbdCategory.find();

      if (showPwbdCategory.length == 0) {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        next(
          new GeneralResponse(showPwbdCategory, undefined, config.HTTP_CREATED)
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

  //view migrant
  viewMigrant: async (req, res, next) => {
    try {
      const showMigrantCategory = await Migrant.find();

      if (showMigrantCategory.length == 0) {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        next(
          new GeneralResponse(
            showMigrantCategory,
            undefined,
            config.HTTP_CREATED
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

  //view Cwcategory data
  viewCWCategory: async (req, res, next) => {
    try {
      const showCwCategory = await CWCategory.find();

      if (showCwCategory.length == 0) {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        next(
          new GeneralResponse(showCwCategory, undefined, config.HTTP_CREATED)
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

  //add other category data
  addOtherCategoryData: async (req, res, next) => {
    try {
      const {
        pwbdCategory,
        migrant,
        cwCategory,
        specialScholarship,
        studentScholarship,
        identityProof,
      } = req.body;
      const applicationNo = req.user.applicationNo;

      let findDetail = await CategoryQuota.findOne({
        applicationNo,
      });

      if (findDetail) {
        next(
          new GeneralError(
            `Other Category Quota  ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        let categoryData = new CategoryQuota({
          applicationNo,
          pwbdCategory,
          migrant,
          cwCategory,
          specialScholarship,
          studentScholarship,
          identityProof,
        });
        let result = await categoryData.save();
        
        if (result) {
          next(
            new GeneralResponse(
              `Other category quota ${response.ADDED_SUCCESSFULLY}`,
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

  //view other category data
  viewOtherCategoryData: async (req, res, next) => {
    try {
      const findData = await CategoryQuota.aggregate([
        {
          $match: {
            applicationNo: req.user.applicationNo,
          },
        },
        {
          $addFields: {
            pwbdCategoryObjectId: {
              $toObjectId: "$pwbdCategory",
            },
            cwCategoryObjectId: {
              $toObjectId: "$cwCategory",
            },
            migrantObjectId: {
              $toObjectId: "$migrant",
            },
          },
        },
        {
          $lookup: {
            from: "pwbdcategories",
            localField: "pwbdCategoryObjectId",
            foreignField: "_id",
            as: "pwbdCategoryData",
          },
        },
        {
          $unwind: "$pwbdCategoryData",
        },
        {
          $lookup: {
            from: "cwcategories",
            localField: "cwCategoryObjectId",
            foreignField: "_id",
            as: "cwCategoryData",
          },
        },
        {
          $unwind: "$cwCategoryData",
        },
        {
          $lookup: {
            from: "migrants",
            localField: "migrantObjectId",
            foreignField: "_id",
            as: "migrantData",
          },
        },
        {
          $unwind: "$migrantData",
        },
        {
          $project: {
            _id: 0,
            applicationNo: 1,
            specialScholarship: 1,
            studentScholarship: 1,
            identityProof: 1,
            pwbdCategory: "$pwbdCategoryData.categoryname",
            cwCategory: "$cwCategoryData.cwCategoryName",
            migrant: "$migrantData.migrantname",
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
          response.SERVER_ERROR,
          undefined,
          config.HTTP_SERVER_ERROR
        )
      );
    }
  },

  //update other category data
  updateOtherCategoryData: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const {
        pwbdCategory,
        migrant,
        cwCategory,
        specialScholarship,
        studentScholarship,
        identityProof,
      } = req.body;
      const updateData = {
        pwbdCategory,
        migrant,
        cwCategory,
        specialScholarship,
        studentScholarship,
        identityProof,
      };
      const updateCategory = await CategoryQuota.updateOne(
        { applicationNo },
        updateData
      );

      if (updateCategory.modifiedCount) {
        next(
          new GeneralResponse(
            `Category Quota ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      } else {
        next(
          new GeneralError(
            `Category Quota ${response.NOT_UPDATED}`,
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
