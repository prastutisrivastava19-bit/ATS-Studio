
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
  analyzeUploadedResume,
} = require("../controllers/resumeController");

// Upload resume
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

// Analyze uploaded resume
router.post(
  "/:id/analyze",
  protect,
  analyzeUploadedResume
);

module.exports = router;
