const mongoose = require("mongoose");
const validator =require("validator");
//const multer = require('multer');

const productSchema = new mongoose.Schema({
   name: String,
    image: String
//   Google_review:Number,
   
// trip_advisor_review:Number,
    

// hotel_id:String,

// owner_id:String,


// hotel_logo:String,
    


// hotel_name: String,
   

// Address:String,
  

// hotel_location:String,
    
// hotel_stars:Number,
    

// Cover_photo:String,



// About:String


});
  
  const Product = mongoose.model('Product', productSchema);
  module.exports = Product;