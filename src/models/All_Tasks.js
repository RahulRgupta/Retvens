const mongoose = require("mongoose");
const moment = require("moment");

const  Task = new mongoose.Schema({
    hotel_name:{
        type:String,
        required:true
    },
    owner_id:{
        type:String,
        required:true
      },
      hotel_id:{
        type:String,
        required:true
      },
    Date:{
       type:String,
       default: moment().format('DD-MM-YY')
    },
    facebook:{
        type:String,
        required:true

    },
    Linkedin:{
        type:String,
        required:true,
    },
    instagram:{
        type:String,
        required:true
    },
    twitter:{
        type:String,
        required:true
    },

 Pinterest:{
    type:String,
    required:true
 },
 GMB:{
    type:String,
    required:true
 },
 Google_reviews:{
    type:String,
    required:true
 },
 owner_pic:{
    type:String,
    required:true
 },
 favourite:{
   type:String,
   required:true
 },
 Status:{
    type:String,
    required:true
 }

})

const  All_task = mongoose.model('All_task', Task)
  module.exports =All_task;
