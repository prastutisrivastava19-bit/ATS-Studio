
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

// Get logged-in user's profile
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully!",
    user: req.user,
  });
});

module.exports = router;
