import express from "express";
const router = express.Router();
import verifyToken from "../middleware/protected.js";
import User from "../models/user.js";

router.get("/", async (req, res) => {
  // This route is protected and only accessible with a valid token.
  // You can access the user data from req.userData.
  try {
    const totalUsers = await User.countDocuments();

    // Count clients
    const totalClients = await User.countDocuments({ role: 'client' });

    // Calculate total clients received amount and remaining amount
    const clients = await User.find({ role: 'client' });

    let totalReceivedAmount = 0;
    let totalRemainingAmount = 0;

    clients.forEach((client) => {
      // totalReceivedAmount += parseInt(client.recievedAmount) + parseInt(client.bottlesRecievedAmount) || 0;
      // totalRemainingAmount += parseInt(client.remainingAmount) + parseInt(client.bottlesRemainingAmount) || 0;
      totalReceivedAmount += parseInt(client.recievedAmount) || 0;
      totalRemainingAmount += parseInt(client.remainingAmount) || 0;
    });

    let users = []
    
    const data = {totalClients,totalUsers,totalReceivedAmount,totalRemainingAmount, clients};
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  // This route is protected and only accessible with a valid token.
  // You can access the user data from req.userData.
  try {
    const { id } = req.params;
    const found = await User.findById(id);
    res.status(200).json({ data: found });
  } catch (error) {
    res.status(500).json({ error: "Could not found" });
  }
  res.status(200).json({ message: "Access granted" });
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req?.userData?.userId;
    const { username, phone, address, bottles } = req.body;
    const created = new User({
      userId,
      username,
      phone,
      address,
      bottles,
    });
    await created.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Updation failed" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Deletion failed" });
  }
});

export default router;
