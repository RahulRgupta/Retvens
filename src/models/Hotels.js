const mongoose = require("mongoose");
const validator =require("validator");
const shortid = require("shortid");
const PropertySchema = new mongoose.Schema({

    
    Google_review:{
        type:Number,
        required:true
    },
    trip_advisor_review:{
        type:Number,
        required:true
    },
   hotel_id:{
    type:String,
    //required:true,
    default: shortid.generate,
   },
   owner_id:{
    type:String,
    required:true
  },
  hotel_logo:{
        type:String,
    required:true
    },

    hotel_name: {
        type: String,
        required: true
    },

    Address:{
       type:String,
       required:true
    },

   Country:{
     type:String,
    required:true
   },
   hotel_location:
   {
    Latitude:String,
    Longitude:String

   },
    hotel_stars: {
        type: Number,
        required: true
    },
    
    Cover_photo:{
    type:String,
    required:true
},

About:{
    type:String,
    required:true
}

});
//PropertySchema.add({ Cover_photo: { type: String ,  required: true} });

  //const Hotel= mongoose.model('Hotel', Hotel_details);
  const Property = mongoose.model('Property',PropertySchema);
  module.exports =Property;