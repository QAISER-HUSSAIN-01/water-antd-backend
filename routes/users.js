import express from "express";
const router = express.Router();
import verifyToken from "../middleware/protected.js";
import User from "../models/user.js";

router.get("/list", verifyToken, async (req, res) => {
  // This route is protected and only accessible with a valid token.
  // You can access the user data from req.userData.
  try {
    const data = await User.find({}, "username _id");
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: true, message: "Something went wrong" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  // router.get('/', async (req, res) => {
  // You can access the user data from req.userData.
  try {
    const data = await User.find({role:{$ne:'client'}}).select('-password');
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  // You can access the user data from req.userData.
  try {
    const { id } = req.params;
    const found = await User.findById(id).select('-password');
    res.status(200).json({ success: true, data: found });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not found" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const createdBy = req?.userData?.userId;
    const created = new User({
      createdBy,
      ...req.body,
    });
    await created.save();
    const users = await User.find({role:{$ne:'client'}}).select('-password');
    res
      .status(201)
      .json({ success: true, message: "Registered Successfully", data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Registration Failed" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body, { new: true });
    const users = await User.find({role:{$ne:'client'}}).select('-password');
    res
      .status(200)
      .json({ success: true, message: "Updated Successfully", data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Updation Failed" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    const users = await User.find({role:{$ne:'client'}}).select('-password');
    res
      .status(200)
      .json({ success: true, message: "Deleted Successfully", data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Deletion Failed" });
  }
});

export default router;
