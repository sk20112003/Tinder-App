const express =require("express")
const connectDB= require("./config/database.js");
const app= express();
const cookieParser= require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const authRouter=require('./routes/auth.js');
const profileRouter=require('./routes/profile.js');
const requestRouter=require('./routes/request.js');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB()
.then(()=>{
    console.log("DATABASE CONNECTED ");
    app.listen(3000, ()=>{
        console.log("Server is listing on port on 3000");
    });
})
.catch((err)=>{
    console.log(err);
});


