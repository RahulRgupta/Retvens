const mongoose = require("mongoose");
const validator =require("validator");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const HotelSchema = new mongoose.Schema({
  // Type:{
  //   type:String
  // },
  
  Name: {type:String,
        required:true,
        minlength:4,
        //uppercase:true,
        //trim:true
    },
    

  Email: {type: String, 
         required:true,
          unique:[true,"Email id already present"],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email")
                }
            } 
         },

  Password: {
             type:String,
            required:true,
             minlength:8
            },
            
            
  Phone: {type:Number,
        required:true,
        min:10
    },
    owner_id: {
      type:String,
      default: shortid.generate,
  },
  
  

  Profile_photo: {type:String,
    required:true
  },

  Service_type: {type:String,required:true
},
Cover_photo: {type:String,required:true
},
  Country:{
    type:String,
    //required:true 

  },

});
//
//HotelSchema.pre("save", function (next) {
  //const user = this;
  //if (!user.isModified("password")) return next();

//   bcrypt.hash(user.password, 10, (error, hash) => {
//     if (error) return next(error);
//     user.password = hash;
//     decrypt_pass = hash;
//     bcrypt
//     next();
//   });
// });




  const Hotel_owner= mongoose.model('Hotel_owner', HotelSchema);
  module.exports =Hotel_owner;
  
  
  
  