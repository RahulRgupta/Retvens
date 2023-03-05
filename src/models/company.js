const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = new mongoose.Schema({
    token:{
        type:Number,
        required:true
    
    },
    Name: {
        type:String,
        required: true
    },
    Email: {
        type: String, 
        required: true, 
        unique:[true,"email id already present"],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email")
                }
            } 

    },
    Password: {
        type:String,
        required: true
    },
    Phone_no: {
        type:Number,
        required: true
    },
    Profile_photo: {
        type:String,
        required: true
    },
    User_id: {
        type: String, required: true, 
    },
      });
    
      //company model
      const Company = mongoose.model('Company', companySchema);
      module.exports = Company;

