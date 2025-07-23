const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Proper CORS Configuration
app.use(cors({
  origin: ["http://localhost:5173", "https://prodigy-fs-01-eosin.vercel.app"], // No trailing slash!
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Handle Preflight requests
app.options("*", cors());

// ✅ Middleware to parse JSON bodies
app.use(express.json());

// ✅ API Route
app.use("/api/auth", require("./routes/auth"));

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ API is running");
});

// ✅ MongoDB Connection + Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
