const express = require("express")

const app = express();

app.post("/user/signup" , (req , res) => {
    res.json({
        message : "signup endpoint"
    })
})

app.post("/user/signin" , (req , res)=>{
     res.json({
        message : "signin endpoint"
     })
})

app.get("user/purchases" , (req, res)=>{
   res.json({
    message : ""
   })
})

app.post("/course/purchase" , (req , res)=>{
   res.json({
    message : ""
   })
})

app.get("courses" , (req ,res)=>{
   res.json({
    message : ""
   })
})

app.listen(3000)