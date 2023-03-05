const mongoose = require("mongoose");
const validator =require("validator");

const Social_Media = new mongoose.Schema({
    owner_id:{
      type:Number,
      required:true
    },
    restro_id:{
      type:Number,
      required:true
    },
    social_media:[{
      facebook:String,
      Twitter:String,
      Instagram:String,
      Linkedin:String,
      Pinterest:String,
      Youtube:String,
      GMB:String
  
  
    }],
  });

  const  Social_restaurant = mongoose.model('Social_restaurant', Social_Media)
  module.exports =Social_restaurant;
