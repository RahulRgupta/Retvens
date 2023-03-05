const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
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
    
      //admin model
      const Admin = mongoose.model('Admin', adminSchema);
      module.exports = Admin;
    
      
    
      