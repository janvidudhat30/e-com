const { User, Default } = require("../models/registrationModel");
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const config = require("../utils/config");
const bcrypt = require("bcrypt");
const logger = require("../loggers/logger");
const { OTPsend } = require("../helper/sendEmail");
let otpNo = Math.floor(Math.random() * 100000 + 1);
let response = require("../helper/responseMessage");

module.exports = {
  //registration
  registration: async (req, res, next) => {
    try {
      const { applicationNo, dob } = req.body;
      let findDefault = await Default.findOne({
        applicationNo,
      });

      if (findDefault) {
        let user = await User.findOne({
          applicationNo,
        });

        if (user) {
          next(
            new GeneralError(
              response.ALREADY_REGISTER,
              undefined,
              config.HTTP_ACCEPTED
            )
          );
        } else {
          const user_data = new User({
            applicationNo,
            dob,
            email: findDefault.email,
            otp: otpNo,
          });

          let result = await user_data.save();
          if (result) {
            await OTPsend(user_data.email, otpNo);
            next(
              new GeneralResponse(
                response.REGISTER_SUCCESSFULLY + user_data.email,
                undefined,
                config.HTTP_CREATED
              )
            );
          }
        }
      } else {
        next(
          new GeneralError(response.NOT_ALLOW, undefined, config.HTTP_ACCEPTED)
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

  //update password
  updatePassword: async (req, res, next) => {
    try {
      const { email, otp, password } = req.body;

      let findUser = await User.findOne({
        email,
      });

      if (findUser) {
        if (findUser.otp != otp) {
          next(
            new GeneralResponse(
              response.INVALID_OTP,
              undefined,
              config.HTTP_CREATED
            )
          );
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const updateData = {
          password: hashPassword,
          email,
        };
        const checkUpdate = await User.updateOne({ email }, updateData);

        if (checkUpdate) {
          next(
            new GeneralResponse(
              `Password ${response.UPDATE_DATA}`,
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

  //login
  login: async (req, res, next) => {
    try {
      const { applicationNo, password } = req.body;
      let user = await User.findOne({ applicationNo });

      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          next(
            new GeneralError(
              `$Password ${response.INVALID}`,
              undefined,
              config.HTTP_ACCEPTED
            )
          );
        } else {
          const token = res.middlewareData;
          res.header("x-auth-token", token);
          next(new GeneralResponse(token, undefined, config.HTTP_CREATED));
        }
      } else {
        next(
          new GeneralError(
            `$Application No ${response.INVALID}`,
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
};
