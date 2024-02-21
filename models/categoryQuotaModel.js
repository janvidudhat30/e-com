const { Migrant } = require("./addMigrantModel");
const { pwbdCategory } = require("./addPWBDCategoryQuotaModel");
const { CWCategory } = require("./addCwCategoryModel");
const mongoose = require("mongoose");

const otherCategoryQuota = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  pwbdCategory: {
    type: String,
    ref: pwbdCategory,
    required: true,
  },
  migrant: {
    type: String,
    ref: Migrant,
    required: true,
  },
  cwCategory: {
    type: String,
    ref: CWCategory,
    required: true,
  },
  specialScholarship: {
    type: String,
    enum: ["Government", "Private"],
    required: true,
  },
  studentScholarship: {
    type: String,
    enum: ["Not Applicable", "National Means cum Merit Scholarship NMMSS"],
    required: true,
  },
  identityProof: {
    type: String,
    enum: ["Not Applicable", "PanCard", "Adhar Card"],
    required: true,
  },
});

const CategoryQuota = mongoose.model("categoryQuota", otherCategoryQuota);

exports.CategoryQuota = CategoryQuota;
