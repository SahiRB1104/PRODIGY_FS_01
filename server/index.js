const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: ["http://localhost:5173", "https://prodigy-fs-01-eosin.vercel.app"],
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ Auth routes
app.use("/api/auth", require("./routes/auth"));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ API is running");
});

// ✅ Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
