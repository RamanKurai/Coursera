require("dotenv").config()
console.log(process.env.MONGO_URL)
const express = require("express");
const mongoose = require("mongoose")
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

app.use("/api/v1/user" , userRouter)
app.use("/api/v1/admin" , adminRouter)
app.use("/api/v1/course" , courseRouter)

async function Main() {
    await mongoose.connect( process.env.MONGO_URL)
    app.listen(3000)
}
Main()