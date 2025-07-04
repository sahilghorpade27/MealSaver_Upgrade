import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { regNo, name, year, mobile, password } = req.body;

  if (!regNo || !name || !year || !mobile || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const existingUser = await User.findOne({ regNo });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
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
  res.status(201).json({ message: 'User registered successfully' });
};

export const loginUser = async (req, res) => {
  const { regNo, password } = req.body;

  const user = await User.findOne({ regNo });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  res.json({
    message: 'Login successful',
    user: {
      regNo: user.regNo,
      name: user.name,
      year: user.year,
      mobile: user.mobile,
    }
  });
};
