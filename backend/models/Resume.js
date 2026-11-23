
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["pdf", "docx"],
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    jobDescription: {
      type: String,
      default: "",
    },

    atsScore: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },

    scores: {
      type: [
        {
          category: String,
          score: Number,
        },
      ],
      default: [],
    },

    issues: {
      type: [
        {
          id: String,
          title: String,
          description: String,
          severity: String,
          recommendation: String,
        },
      ],
      default: [],
    },

    suggestions: {
      type: [
        {
          id: String,
          title: String,
          description: String,
          priority: String,
          action: String,
        },
      ],
      default: [],
    },

    matchedKeywords: {
      type: [String],
      default: [],
    },

    missingKeywords: {
      type: [String],
      default: [],
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    resumeSkills: {
      type: [String],
      default: [],
    },

    analysisStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
