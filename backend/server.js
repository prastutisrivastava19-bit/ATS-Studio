const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// Resume routes
app.use("/api/resumes", resumeRoutes);

// Authentication routes
//app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("ATS Studio Backend is running!");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
