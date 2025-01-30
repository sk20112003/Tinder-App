const express =require('express');
const profileRouter=express.Router();
const {userAuth}=require("../middleware/auth.js");
const jwt= require('jsonwebtoken');
const {validateEditeProfileData}= require("../utils/validation.js");

profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("Error :" +err.message);
    }
     
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
   
    try{
       if(!validateEditeProfileData(req)){
       throw new Error("Invalid Edit Request");
       };
       const loggedin=req.user;
      Object.keys(req.body).forEach((key)=>(loggedin[key]=req.body[key]));
      await loggedin.save();
      res.json({
        message:`${loggedin.firstName}, Your profile updated successfully`,
        data:loggedin,
    });
      
    }
    catch(err){
       res.send(400).send("Error :"+err.message);
    }
     
});

 
module.exports=profileRouter;
