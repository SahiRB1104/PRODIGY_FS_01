const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Proper CORS config
app.use(cors({
  origin: ["http://localhost:5173", "https://prodigy-fs-01-eosin.vercel.app/"],
  credentials: true,
}));

// ✅ Required middleware for JSON parsing
app.use(express.json());

// ✅ Auth routes
app.use("/api/auth", require("./routes/auth"));

// ✅ Start Mongo + server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
