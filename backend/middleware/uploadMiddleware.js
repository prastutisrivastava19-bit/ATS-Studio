
const multer = require("multer");
const path = require("path");

// Configure file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// Validate uploaded files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const extension = path.extname(file.originalname).toLowerCase();

  if (
    allowedTypes.includes(file.mimetype) &&
    [".pdf", ".docx"].includes(extension)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and DOCX files are allowed."));
  }
};

// Configure Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

module.exports = upload;
