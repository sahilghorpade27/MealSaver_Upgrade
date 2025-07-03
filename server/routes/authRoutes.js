import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import Institute from "../models/institute.js";

const router = express.Router();

// POST /api/register
router.post("/register", async (req, res) => {
  const { name, email, password, instituteCode } = req.body;

  // 1. Validate all fields
  if (!name || !email || !password || !instituteCode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // 2. Check if institute exists
    const institute = await Institute.findOne({ code: instituteCode });
    if (!institute) {
      return res.status(404).json({ error: "Institute not found" });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      instituteCode,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 4. Success
    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        instituteCode: user.instituteCode,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
