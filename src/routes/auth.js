const express =require('express');
const authRouter=express.Router();
const {validatesignup}=require("../utils/validation.js");
const User= require("../models/user.js");
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');


authRouter.post("/signup",async(req,res)=>{
    try{
        validatesignup(req);
        const {firstName,lastName,emailId,password}=req.body;
        const hashpassword=await bcrypt.hash(password,10);
        console.log(hashpassword);
        const user =new User({
            firstName,
            lastName,
            emailId,
            password: hashpassword,
        });
       await user.save();
        res.send("User added successfully");
    }
    catch(err){
       res.status(400).send("Error :"+err.message);
   }});

authRouter.post("/login",async(req,res)=>{
       try{
          const {emailId,password}=req.body;
       const user=await User.findOne({emailId:emailId});
       if(!user){
           throw new Error("Invalid creandiatls");
       }
          const isPasswordValid= await user.validatePassword(password);
          if(isPasswordValid){
           const token= await user.getJWT();
           console.log(token);
           res.cookie("token",token);
           res.send("Login Successfully")
          }else{
           throw new Error("Invalid crendiatls");
          }
       }catch(err){
           res.status(400).send("Error :"+err.message);
           
       }
   });

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("Logout Successfully");
})   



module.exports=authRouter;