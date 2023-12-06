const express = require("express");
const app=express()
const port =5000;
const mongoose=require("mongoose")
const {mongoUrl}=require('./keys')

require('./model/models')
require('./model/post')
const cors =require("cors")

app.use(cors())

app.use(express.json())
app.use(require('./routes/createPost'))

app.use(require('./routes/auth'))

mongoose.connect(mongoUrl)


mongoose.connection.on("connected",()=>{
    console.log("successfully conncted to mongo")
    })

mongoose.connection.on("error",()=>{
        console.log("successfully conncted to mongo")
        })    




app.listen(port,()=>{
    console.log("Server is running on 5000")
})