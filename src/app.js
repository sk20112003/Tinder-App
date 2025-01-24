const express =require("express")
const app= express();

app.use("/test",(req,res)=>{
    res.send("sandyd World");
});

app.use("/hello",(req,res)=>{
    res.send("Hellow");
});

app.use("/",(req,res)=>{
    res.send("Dash");
});


app.listen(3000, ()=>{
    console.log("Server is listing on port on 3000");
});