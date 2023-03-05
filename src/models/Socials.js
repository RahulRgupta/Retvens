const mongoose = require("mongoose");
const validator =require("validator");

const Social_media = new mongoose.Schema({
    owner_id:{
      type:String,
      required:true
    },
    hotel_id:{
      type:String,
      required:true
    },
    social_media:{
      facebook:String,
      Twitter:String,
      Instagram:String,
      Linkedin:String,
      Pinterest:String,
      Whatsapp:String,
      Youtube:String,
      GMB:String
    }
  });

  const  Social = mongoose.model('Social', Social_media)
  module.exports =Social;
  