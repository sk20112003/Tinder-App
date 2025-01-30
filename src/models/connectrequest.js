const mongoose=require('mongoose');
const ConnectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        }
    }
},{
      timestamps: true,
});

const ConnectionRequestModel = new mongoose.model("connectionrequest",ConnectionRequestSchema);
module.exports=ConnectionRequestModel;