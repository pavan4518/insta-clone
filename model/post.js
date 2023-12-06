const { ObjectId } = require("mongodb")
const mongoose= require("mongoose")

const postSchema =new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"No photo"
    },
    postedBy:{
        type:ObjectId,
        ref:"USER"
    }
})

mongoose.model("POST",postSchema)