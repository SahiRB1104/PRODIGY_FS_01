const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashed });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ✅ Auth Middleware (Recommended: move to middleware/auth.js)
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};

// ✅ Protected Route (/me)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("username email");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ username: user.username, email: user.email });
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
