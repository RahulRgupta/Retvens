const mongoose = require("mongoose");
const validator =require("validator");

//mongoose.connect("mongodb+srv://Hotel:Hotel@cluster0.qqo0way.mongodb.net/Retvens",{ useNewUrlParser: true })
const countries = new mongoose.Schema({
    Name:{
      type:String,
      required:true
    },
    Country_photo:{
        type:String,
        required:true
    },

    
  });

  const  Country = mongoose.model('Country', countries)
  module.exports =Country;
