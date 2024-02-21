const mongoose=require('mongoose');

const category=new mongoose.Schema({

    categoryname:{
    type:String,
    required:true
  },
});

const pwbdCategory=mongoose.model('PWBDCategory',category);

exports.pwbdCategory=pwbdCategory;
