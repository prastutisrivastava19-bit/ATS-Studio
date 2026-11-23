
const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "from",
  "are", "was", "were", "will", "you", "your", "our",
  "have", "has", "had", "can", "may", "should", "must",
  "who", "what", "when", "where", "how", "all", "any",
  "into", "their", "they", "them", "about", "using",
  "use", "used", "work", "working", "job", "role",
  "candidate", "ability", "experience", "required",
  "preferred", "skills", "skill", "knowledge"
]);

const SKILLS = [
  "javascript", "react", "react.js", "node.js", "node",
  "express", "express.js", "mongodb", "mongoose",
  "mysql", "sqlite", "sql", "python", "java", "c++",
  "c", "html", "css", "typescript", "git", "github",
  "rest api", "api", "bootstrap", "tailwind",
  "streamlit", "firebase", "communication",
  "problem solving", "data structures", "algorithms",
  "machine learning", "artificial intelligence",
  "data analysis", "excel", "power bi", "aws",
  "cloud computing", "testing", "debugging"
];

const SECTION_HEADINGS = [
  "summary", "objective", "education", "experience",
  "work experience", "internship", "projects",
  "technical skills", "skills", "certifications",
  "achievements", "contact", "activities"
];

const normalize = (text) =>
  text.toLowerCase().replace(/[^a-z0-9+#.\s]/g, " ");

const getWords = (text) =>
  normalize(text)
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOP_WORDS.has(word));

const getUniqueKeywords = (text) =>
  [...new Set(getWords(text))];

const calculatePercentage = (matched, total) => {
  if (!total) return 0;
  return Math.min(100, Math.round((matched / total) * 100));
};

const findSkills = (text) => {
  const normalizedText = normalize(text);

  return SKILLS.filter(skill =>
    normalizedText.includes(skill)
  );
};

const analyzeResume = (resumeText, jobDescription) => {
  const resume = normalize(resumeText);
  const job = normalize(jobDescription);

  // Keyword matching
  const jobKeywords = getUniqueKeywords(job);
  const resumeKeywords = new Set(getUniqueKeywords(resume));

  const matchedKeywords = jobKeywords.filter(keyword =>
    resumeKeywords.has(keyword)
  );

  const missingKeywords = jobKeywords.filter(keyword =>
    !resumeKeywords.has(keyword)
  );

  const keywordMatch = calculatePercentage(
    matchedKeywords.length,
    jobKeywords.length
  );

  // Technical and professional skills matching
  const requiredSkills = findSkills(jobDescription);
  const resumeSkills = findSkills(resumeText);

  const matchedSkills = requiredSkills.filter(skill =>
    resumeSkills.includes(skill)
  );

  const skillsMatch = requiredSkills.length
    ? calculatePercentage(matchedSkills.length, requiredSkills.length)
    : 0;

  // Formatting and section checks
  const presentSections = SECTION_HEADINGS.filter(section =>
    resume.includes(section)
  );

  const formattingScore = Math.min(
    100,
    Math.round(
      (presentSections.length / 6) * 60 +
      (resumeText.length >= 500 ? 20 : 10) +
      (/\S+@\S+\.\S+/.test(resumeText) ? 10 : 0) +
      (resumeText.split("\n").filter(line =>
        /^\s*[-•*]/.test(line)
      ).length >= 3 ? 10 : 0)
    )
  );

  // Experience relevance
  const experienceTerms = [
    "internship", "intern", "experience", "worked",
    "developed", "built", "managed", "contributed",
    "responsible", "project"
  ];

  const experienceCount = experienceTerms.filter(term =>
    resume.includes(term)
  ).length;

  const experienceMatch = Math.min(
    100,
    experienceCount * 15
  );

  // Education
  const educationTerms = [
    "bachelor", "b.tech", "btech", "degree",
    "university", "college", "education",
    "computer science", "engineering", "diploma"
  ];

  const educationCount = educationTerms.filter(term =>
    resume.includes(term)
  ).length;

  const educationMatch = Math.min(
    100,
    educationCount * 20
  );

  // Overall score
  const overallScore = Math.round(
    keywordMatch * 0.35 +
    skillsMatch * 0.25 +
    formattingScore * 0.15 +
    experienceMatch * 0.15 +
    educationMatch * 0.10
  );

  // Issues
  const issues = [];

  if (missingKeywords.length > 0) {
    issues.push({
      id: "missing-keywords",
      title: "Missing job-related keywords",
      description:
        `Your resume is missing keywords such as: ${missingKeywords.slice(0, 8).join(", ")}.`,
      severity: "critical",
      recommendation:
        "Include relevant missing keywords naturally wherever they accurately describe your skills or experience."
    });
  }

  if (!/\S+@\S+\.\S+/.test(resumeText)) {
    issues.push({
      id: "missing-email",
      title: "Email address not detected",
      description: "We could not detect an email address in your resume.",
      severity: "warning",
      recommendation: "Add a professional email address in your contact section."
    });
  }

  if (presentSections.length < 5) {
    issues.push({
      id: "missing-sections",
      title: "Important resume sections may be missing",
      description: "Some standard resume sections were not detected.",
      severity: "warning",
      recommendation:
        "Consider adding clear sections for education, skills, projects, and experience where applicable."
    });
  }

  if (resumeText.length < 500) {
    issues.push({
      id: "short-resume",
      title: "Resume content appears limited",
      description: "The extracted resume text is relatively short.",
      severity: "warning",
      recommendation:
        "Add relevant project details, technical skills, education, and achievements without unnecessary information."
    });
  }

  if (skillsMatch < 50) {
    issues.push({
      id: "low-skills-match",
      title: "Low skills match",
      description: "Your detected skills have limited overlap with the job description.",
      severity: "critical",
      recommendation:
        "Highlight relevant skills you genuinely possess and demonstrate them through projects or experience."
    });
  }

  // Suggestions
  const suggestions = [
    {
      id: "keywords",
      title: "Improve keyword relevance",
      description:
        "Tailor your resume to the job description using relevant terminology.",
      priority: "high",
      action: "Review the missing keywords and add only those that accurately apply to you."
    },
    {
      id: "projects",
      title: "Strengthen project descriptions",
      description:
        "Explain your contribution, technologies used, and project outcomes.",
      priority: "medium",
      action: "Use clear action verbs and measurable results where possible."
    },
    {
      id: "format",
      title: "Improve resume organization",
      description:
        "Use clear headings and consistent formatting.",
      priority: "medium",
      action: "Organize your resume into easily identifiable sections."
    }
  ];

  const scores = [
    { category: "keywordMatch", score: keywordMatch },
    { category: "formatting", score: formattingScore },
    { category: "skillsMatch", score: skillsMatch },
    { category: "experienceMatch", score: experienceMatch },
    { category: "educationMatch", score: educationMatch }
  ];

  return {
    atsScore: overallScore,
    scores,
    issues,
    suggestions,
    matchedKeywords: matchedKeywords.slice(0, 30),
    missingKeywords: missingKeywords.slice(0, 30),
    matchedSkills,
    resumeSkills
  };
};

module.exports = analyzeResume;
