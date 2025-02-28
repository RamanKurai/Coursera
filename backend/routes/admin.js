const {Router} = require("express")

const adminRouter = Router();

adminRouter.post("/signup" , (req , res) => {
    res.json({
        message : ""
       })
})

adminRouter.post("/signin" , (req , res) => {
    res.json({
        message : ""
       })
})

adminRouter.post("/course" , (req , res) => {
    res.json({
        message : ""
       })
})

adminRouter.put("/course" , (req , res) => {
    res.json({
        message : ""
       })
})

adminRouter.get("/course/bulk" , (req , res)=>{
    res.json({
        message : ""
       })
})

module.exports = {
   adminRouter : adminRouter
}