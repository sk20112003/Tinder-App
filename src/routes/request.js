const express=require('express');
const requestRouter=express.Router();
const {userAuth}=require("../middleware/auth.js");
const jwt= require('jsonwebtoken');
const user = require('../models/user.js');
const ConnectionRequest= require("../models/connectrequest.js");


requestRouter.post("679af938ed3ebcbac1ae5df1",userAuth,async(req,res)=>{
    try{
      const fromUserId=req.user._id;
      const toUserId=req.params.toUserId;
      const status= req.params.status;

      const allowedStatus= ["ignored","interested"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"Invalid status Type"+status});
      }

      const connectionRequest= new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
     const data= await connectionRequest.save();
     res.json({
        message:"Connection request Sent succesfully",
        data,
     });


    }catch(err){
        res.status(400).send("ERROR"+err.message);
    }
   
});



module.exports=requestRouter;