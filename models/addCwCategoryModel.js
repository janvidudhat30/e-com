const mongoose=require('mongoose');

const cwCategory=new mongoose.Schema({

    cwCategoryName:{
    type:String,
    required:true
  },
});

const CWCategory=mongoose.model('CwCategory',cwCategory);

exports.CWCategory=CWCategory;
