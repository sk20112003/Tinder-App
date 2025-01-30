const mongoose =require("mongoose");
const connectDB=async()=>{
   await mongoose.connect(
    "mongodb+srv://santhosh3908:ys46gykir4pRNOix@cluster0.6xed7.mongodb.net/devtinder");
};
module.exports=connectDB;
    