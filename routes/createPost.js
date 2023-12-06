const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

router.post("/createPost",(req,res)=>{
    const{title,body}=req.body;
    if(!title || !body){
        return res.status(422).json({error:"Please add all the field"})
    }
    res.json("ok")
})

module.exports=router