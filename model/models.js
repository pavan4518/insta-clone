const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

   name:{
        type:String,
        required:true
    },
    //likes:[{type:ObjectId, ref:"USER"}],
    comments:[{
        comment:{type:String},
        postedBy:{type:ObjectId, ref:"USER"}
    }],
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
   
    
  });


  module.export = mongoose.model('USER', userSchema)