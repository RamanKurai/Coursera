const express = require("express");
const { Router } = require("express");
const { userModel } = require("../db");
const { z } = require("zod");
const { JWT_USER_SECRET } = require("../../config");
const { userMiddleware } = require("../middleware/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = Router();
userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {
  const requiredbody = z.object({
    email: z.string().email().min(3).max(100), // FIXED EMAIL VALIDATION
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

  const parsedDataWithSuccess = requiredbody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    return res.status(400).json({
      message: "Incorrect Format",
      error: parsedDataWithSuccess.error.errors,
    });
  }

  const { email, password, firstName, lastName } = req.body;

  try {
    const hashedpassword = await bcrypt.hash(password, 5);
    await userModel.create({
      email,
      password: hashedpassword,
      firstName,
      lastName,
    });

    res.json({
      message: "You are signed up",
    });
  } catch (error) {
    res.status(403).json({
      message: "Invalid Credentials",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }); // FIXED: Changed `find()` to `findOne()`

    if (!user) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id.toString() }, JWT_USER_SECRET);

    res.json({
      message: "You are signed in",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

userRouter.get("/purchases", userMiddleware, (req, res) => {
  const userId = req.userId;

  res.json({
    message: `User ${userId} purchases retrieved successfully.`,
  });
});

module.exports = {
  userRouter,
};
