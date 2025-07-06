import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Register User Controller
export const registerUser = async (req, res) => {
  const { regNo, name, year, mobile, password } = req.body;

  if (!regNo || !name || !year || !mobile || !password) {
    return res.status(400).json({ success: false, message: 'Please enter all fields' });
  }

  const existingUser = await User.findOne({ regNo });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    regNo,
    name,
    year,
    mobile,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ success: true, message: 'User registered successfully' });
};

// Login User Controller
export const loginUser = async (req, res) => {
  const { regNo, password } = req.body;

  const user = await User.findOne({ regNo });
  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }

  res.json({
    success: true,
    message: 'Login successful',
    user: {
      regNo: user.regNo,
      name: user.name,
      year: user.year,
      mobile: user.mobile,
    }
  });
};
