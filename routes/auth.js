const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const USER = mongoose.model("USER");


router.get('/',(req,res)=>{
 res.send("hello")
})
router.post('/signup',(req,res)=>{
   const {name , userName, email, password}= req.body
   if (!name || !userName || !email || !password){
      res.status(422).json({error:"Please add all the field"})
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

   

module.exports=router;