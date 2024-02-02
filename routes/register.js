import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// User registration
router.post("/", async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : "";
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    const data = await User.find().select("-password");
    res
      .status(201)
      .json({ success: true, message: "Registered Successfully", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message: "Registration Failed" });
    // res.status(500).json({ success:false, message: error.message });
  }
});

export default router;
