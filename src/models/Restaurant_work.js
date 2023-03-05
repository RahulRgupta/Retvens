const mongoose = require("mongoose");
const validator =require("validator");

const Restro_work = new mongoose.Schema({
    
    owner_id: {
        type: Number
    }, 
    restro_id:{
        type:Number,
        required:true
    },
    
    created_at : { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    post_upload:{
        type:String,
        required:true
    },
    total_number_of_post:{
        type:Number,
        required:true
    },
    total_number_of_reels:{
        type:Number,
        required:true
    },
    total_number_of_stories:{
        type:Number,
        required:true
    },
    Google_reviews:{
        type:String,
        required:true
    },
    Tripadvisor_reviews:{
        type:String,
        required:true
    }
    
});

const Restroant_Work = mongoose.model('Restroant_Work', Restro_work);
module.exports=Restroant_Work;