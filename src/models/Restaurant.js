const mongoose = require("mongoose");
const validator =require("validator");

const Restroschema = new mongoose.Schema({
 
    owner_id: {
        type: Number
    },
    restro_id: {
        type: Number,
        required: true
    },
    restraurant_profile_photo:{
        type:String,
        required:true
    },

    restaurant_name: {
        type: String,
        required: true
    },

    restaurant_location: {
        type: String,
        required: true
    },
    restaurant_type: {
        type: String,
        required: true
    },
    no_of_pax: {
        type: Number,
        required: true
    },
    
})

const restro_property = mongoose.model('restro_property',Restroschema);
  module.exports =restro_property;