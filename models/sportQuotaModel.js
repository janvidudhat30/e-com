const mongoose = require("mongoose");

const personalDetailSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
  applyStatus: {
    type: String,
    required: true,
    enum: ["Yes", "No"],
  },
  game:{
    type:String,
    ref:'games',
    required:false,
    default:null
  }
});

const SportQuota = mongoose.model("SportQuota", personalDetailSchema);

exports.SportQuota = SportQuota;
