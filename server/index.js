const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Enable CORS from your frontend origin
app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true,
}));

app.use(express.json());

// ✅ Use your auth routes
app.use("/api/auth", require("./routes/auth"));

// ✅ Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
