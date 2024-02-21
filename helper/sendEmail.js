const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  service: "Gmail",
  secure: false,
  port: 25, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const OTPsend = (email, otp) => {
  let mailDetail = {
    to: email,
    subject: "OTP for new Password",
    html:
      "<h3>OTP for new password is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>", 
  };
  return transport.sendMail(mailDetail, function (error, res) {
    if (error) throw error;
  });
};

module.exports = { OTPsend };
