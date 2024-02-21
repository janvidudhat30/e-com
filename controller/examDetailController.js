const { Board } = require("../models/boardModel");
const { Year } = require("../models/yearModel");
const { ExamDetail } = require("../models/examDetailModel");
const config = require("../utils/config");
const logger = require("../loggers/logger");
const response = require("../helper/responseMessage");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");

module.exports = {
  //view board names
  viewBoardNames: async (req, res, next) => {
    try {
      const viewBoardName = await Board.find();

      if (viewBoardName.length == 0) {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
            undefined,
            config.HTTP_NOT_FOUND
          )
        );
      } else {
        next(
          new GeneralResponse(viewBoardName, undefined, config.HTTP_CREATED)
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

  //view Year
  viewYear: async (req, res, next) => {
    try {
      const viewYears = await Year.find();

      if (viewYears.length == 0) {
        next(
          new GeneralError(
            response.DATA_NOT_FOUND,
            undefined,
            config.HTTP_NOT_FOUND
          )
        );
      } else {
        next(new GeneralResponse(viewYears, undefined, config.HTTP_CREATED));
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

  //add exam detail
  addExamDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const { board, resultStatus, boardRollNo, passingYear } = req.body;
      let findUser = await ExamDetail.findOne({
        applicationNo,
      });
      if (findUser) {
        next(
          new GeneralError(
            `Exam detail  ${response.ALREADY_EXIST}`,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        const examDetail = new ExamDetail({
          applicationNo,
          board,
          resultStatus,
          boardRollNo,
          passingYear,
        });
        let result = await examDetail.save();

        if (result) {
          next(
            new GeneralResponse(
              `Exam detail ${response.ADDED_SUCCESSFULLY}`,
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

  //view exam Detail
  viewExamDetail: async (req, res, next) => {
    try {
      const findData = await ExamDetail.aggregate([
        {
          $match: {
            applicationNo: req.user.applicationNo,
          },
        },
        {
          $addFields: {
            boardId: {
              $toObjectId: "$board",
            },
            yearId: {
              $toObjectId: "$passingYear",
            },
          },
        },
        {
          $lookup: {
            from: "boards",
            localField: "boardId",
            foreignField: "_id",
            as: "boardData",
          },
        },
        {
          $unwind: "$boardData",
        },
        {
          $lookup: {
            from: "years",
            localField: "yearId",
            foreignField: "_id",
            as: "yearData",
          },
        },
        {
          $unwind: "$yearData",
        },

        {
          $project: {
            _id: 0,
            applicationNo: 1,
            resultStatus: 1,
            boardRollNo: 1,
            board: "$boardData.board",
            year: "$yearData.year",
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

  //update exam detail
  updateExamDetail: async (req, res, next) => {
    try {
      const applicationNo = req.user.applicationNo;
      const { board, resultStatus, boardRollNo, passingYear } = req.body;

      const updateData = {
        board,
        resultStatus,
        boardRollNo,
        passingYear,
      };

      const updateExamDetail = await ExamDetail.updateOne(
        { applicationNo },
        updateData
      );

      if (updateExamDetail.modifiedCount) {
        next(
          new GeneralResponse(
            `Exam detail ${response.UPDATE_DATA}`,
            undefined,
            config.HTTP_CREATED
          )
        );
      }
      else
      {
        next(
          new GeneralError(
            `Exam detail ${response.NOT_UPDATED}`,
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
