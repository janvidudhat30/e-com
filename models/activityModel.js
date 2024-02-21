const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
  },
 activity:{
    type:String,
    required:true
  }
});

const Activity = mongoose.model("activities", activitySchema);

exports.Activity = Activity;
