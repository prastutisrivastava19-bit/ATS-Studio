
const Resume = require("../models/Resume");
const fs = require("fs/promises");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const analyzeResume = require("../utils/atsAnalyzer");

// Extract text from PDF or DOCX
const extractResumeText = async (filePath, fileType) => {
  const buffer = await fs.readFile(filePath);

  if (fileType === "pdf") {
    const result = await pdfParse(buffer);
    return result.text;
  }

  if (fileType === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported resume file type.");
};

// Upload resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume.",
      });
    }

    const fileType = req.file.originalname
      .toLowerCase()
      .endsWith(".pdf")
      ? "pdf"
      : "docx";

    const extractedText = await extractResumeText(
      req.file.path,
      fileType
    );

    if (!extractedText.trim()) {
      return res.status(400).json({
        message: "No readable text found in this resume.",
      });
    }

    const resume = await Resume.create({
      user: req.user._id,
      originalFileName: req.file.originalname,
      filePath: req.file.path,
      fileType,
      fileSize: req.file.size,
      extractedText,
    });

    res.status(201).json({
      message: "Resume uploaded and text extracted successfully!",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: "Resume upload or text extraction failed.",
      error: error.message,
    });
  }
};

// Analyze uploaded resume
const analyzeUploadedResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        message: "Please provide a job description.",
      });
    }

    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found.",
      });
    }

    if (!resume.extractedText || !resume.extractedText.trim()) {
      return res.status(400).json({
        message: "Resume text is not available for analysis.",
      });
    }

    const result = analyzeResume(
      resume.extractedText,
      jobDescription
    );

    resume.jobDescription = jobDescription;
    resume.atsScore = result.atsScore;
    resume.scores = result.scores;
    resume.issues = result.issues;
    resume.suggestions = result.suggestions;
    resume.matchedKeywords = result.matchedKeywords;
    resume.missingKeywords = result.missingKeywords;
    resume.matchedSkills = result.matchedSkills;
    resume.resumeSkills = result.resumeSkills;
    resume.analysisStatus = "completed";

    await resume.save();

    res.status(200).json({
      message: "Resume analysis completed successfully!",
      result,
      resumeId: resume._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Resume analysis failed.",
      error: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  analyzeUploadedResume,
};
