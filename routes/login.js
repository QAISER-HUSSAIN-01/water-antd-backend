import express from 'express'
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// User login
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success:false, message: 'No User Found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({success:false, message: 'Password Incorrect' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: '24h',
    });

    res.status(200).json({ success:true, message:'Login Successfully', token: token, username: user.username });

  } catch (error) {
    res.status(500).json({success:false, message:'Login Failed'});
  }
});

export default router;
