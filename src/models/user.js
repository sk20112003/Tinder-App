const mongoose = require("mongoose");
const validator=require("validator");
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const userschema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:4,
        maxLength:50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase:true,
        required: true,
        unique: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
             throw new Error("Invalid email address"+value);
            }
        },

    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
             throw new Error("Enter a strong password"+value);
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        enum:{
            type:String,
            values:["male","female","others"],
            message:`{VALUES} is not a valid gener type`
        },
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender value is not valid");
            }
        }
    },
    photoUrl:{
        type: String,
        default: "https://www.kindpng.com/picc/m/366-3664582_bob-bob-dummy-image-of-user-hd-png.png",
        validate(value){
            if(!validator.isURL(value)){
             throw new Error("Invalid Photo URL"+value);
            }
        },
    },
    about:{
        type: String,
        default:"This is a default about of the user!",
    },
    skills:{
        type:[String],
    },
},{
    timestamps: true,
});

userschema.methods.getJWT=async function(){
    const user=this;
   const token= await jwt.sign({_id: user._id},"DEV@Tinder$790",{expiresIn:"7d",
});
return token;
};

userschema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
   const passwordHash=user.password;
   const isPasswordValid= await bcrypt.compare(passwordInputByUser,passwordHash);
   return isPasswordValid;
};


module.exports= mongoose.model("User",userschema);