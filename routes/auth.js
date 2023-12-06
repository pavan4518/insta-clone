const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const USER = mongoose.model("USER");
const jwt =require("jsonwebtoken")
const {jwt_secret}=require("../keys")


router.get('/',(req,res)=>{
 
})
router.post('/signup',(req,res)=>{
   const {name , userName, email, password}= req.body
   if (!name || !userName || !email || !password){
      return res.status(422).json({error:"Please add all the field"})
   }
   USER.findOne({$or:[{email:email},{userName:userName}]}).then((Savedone)=>{
      if(Savedone){
         return res.status(422).json({error:"user Alraedy exist with email and userName"})
      }
     
      bcrypt.hash(password,12).then((hashpassword)=>{
         const user = new USER({
            name,
            email,
            userName,
            password:hashpassword
           })
           user.save()
           .then(user=>{res.json({message:"save successfully"})})
           
           .catch(err=>{console.log(err)})
      })

     
        
        })
     
   })

   router.post("/signin",(req,res)=>{
      const{email,password }=req.body
      
      if(!email || !password){
      return res.status(422).json({error:"please add email and password"})
      
      }
      USER.findOne({email:email}).then((savedUser)=>{
      if(!savedUser){
        return res.json({error:"Invalid"})
      }
      bcrypt.compare(password,savedUser.password).then((match)=>{
      if(match){
      //return res.status(200).json
      //({message:"Signed in Successfully"})
      const token =jwt.sign({_id:savedUser.id},jwt_secret)
      res.json(token)
      console.log(token)
      }else{
        return res.status(422).json({error:"invalid password"})
      }
    })
    .catch(err=>console.log(err))
    })
      
      
      
    })

   

module.exports=router;