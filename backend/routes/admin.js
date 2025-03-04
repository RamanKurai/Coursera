const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const express = require("express")
const { z } = require("zod");
const { JWT_ADMIN_SECRET } = require("../../config");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { adminMiddleware } = require("../middleware/admin");


const adminRouter = Router();
adminRouter.use(express.json())

adminRouter.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().email().min(3).max(100),
    password: z
      .string()
      .min(3)
      .max(100)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    return res.status(403).json({
      message: "Incorrect format",
      error : parsedDataWithSuccess.error.errors
    });
  }

  const { email, password, firstName, lastName } = req.body;
  try {
    const hashedpassword = await bcrypt.hash(password, 5);
    console.log(hashedpassword)
    await adminModel.create({
      email,
      password: hashedpassword,
      firstName,
      lastName
    });
    res.json({
      message: "You are Signed Up",
    });
  } catch (error) {
    res.status(403).json({
      message: "Invalid Crendentials",
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await adminModel.findOne({
      email: email,
    });
    if (!user) {
      res.status(403).json({
        message: " No user find",
      });
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(403).json({
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_ADMIN_SECRET
    );
    if (!token) {
      return res.status(500).json({
        message: "Invalid Credentials",
      });
    } else {
      res.json({
        message: "You are Signed In",
        token: token,
      });
    }
  } catch (error) {}
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId; 

  const { title, description, price, imageUrl} = req.body

  const course = await courseModel.create({
    title : title,
    description : description,
    price: price,
    imageUrl : imageUrl,
    creatorId : adminId
  })

 res.json({
  message :"Course Created",
  courseId : course._id
 })
});

adminRouter.put("/course", adminMiddleware , async (req, res) => {
  const adminId = req.userId; 

  const { title, description, price, imageUrl , courseId} = req.body

  const course = await courseModel.updateOne( {
     _id : courseId,
     creatorId : adminId
  },{
    title : title,
    description : description,
    price: price,
    imageUrl : imageUrl,
  })

 res.json({
  message :"Course Created",
  courseId : course._id
 })
});

adminRouter.get("/course/bulk", adminMiddleware,  (req, res) => {
 
});

module.exports = {
  adminRouter: adminRouter,
};
