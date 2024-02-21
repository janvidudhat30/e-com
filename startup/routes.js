const express=require('express');
const ecaDetail=require('../routes/ecaQuotaRoute');
const studentDetail=require('../routes/studentAdditionalDetailRoute');;
const subjectDetail=require('../routes/subjectDetailRoute');
const examdetail = require("../routes/examDetailRoute");
const bankDetail = require("../routes/bankDetailRoute");
const addressDetail = require("../routes/addressRoute");
const additonalDetail = require("../routes/additionalDetailRoute");
const otherDetail = require("../routes/otherDetailRoute");
const categoryQuota = require("../routes/categoryQuotaRoute");
const registration = require("../routes/registration");
const personalDetail = require("../routes/personalDetailRoute");
const familyDetail = require("../routes/familyDetailRoute");
const wardQquota = require("../routes/wardQuotaRoute");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/registration", registration);
  app.use("/api/info", personalDetail);
  app.use("/api/familyinfo", familyDetail);
  app.use("/api/wardquota", wardQquota);
  app.use("/api/categoryquota", categoryQuota);
  app.use("/api/otherdetail", otherDetail);
  app.use("/api/additionaldetail", additonalDetail);
  app.use("/api/address", addressDetail);
  app.use("/api/bankdetail", bankDetail);
  app.use("/api/examdetail", examdetail);
  app.use('/api/subjectdetail',subjectDetail);
  app.use('/api/studentinfo',studentDetail);
  app.use('/api/ecadetail',ecaDetail)
};
