// controllers/userController.js
import User from "../models/User.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic check
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const newUser = new User({ name, email, password }); // You can hash password later
    await newUser.save();

    console.log("🟢 User Registered:", newUser);

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
