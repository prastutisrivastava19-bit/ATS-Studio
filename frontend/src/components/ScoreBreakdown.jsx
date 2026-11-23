
import React from "react";
import {
  Search,
  FileCheck,
  Code,
  Briefcase,
  GraduationCap,
  ChartNoAxesCombined
} from "lucide-react";

import "../styles/ScoreBreakdown.css";

const ScoreBreakdown = ({
  scores = [],
  loading = false,
  error = ""
}) => {

  const scoreCategories = [
    {
      key: "keywordMatch",
      label: "Keyword Match",
      description: "Relevant keywords found in your resume",
      icon: Search
    },
    {
      key: "formatting",
      label: "Formatting",
      description: "Resume structure and readability",
      icon: FileCheck
    },
    {
      key: "skillsMatch",
      label: "Skills Match",
      description: "Skills relevant to the job description",
      icon: Code
    },
    {
      key: "experienceMatch",
      label: "Experience Match",
      description: "Relevance of your work experience",
      icon: Briefcase
    },
    {
      key: "educationMatch",
      label: "Education Match",
      description: "Educational qualification relevance",
      icon: GraduationCap
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return "excellent";
    if (score >= 60) return "good";
    if (score >= 40) return "average";
    return "poor";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Improvement";
    return "Poor";
  };

  const getScoreValue = (key) => {
    const category = scores.find(
      (item) => item.category === key
    );

    if (!category) return null;

    const value = Number(category.score);

    if (!Number.isFinite(value)) return null;

    return Math.min(100, Math.max(0, value));
  };

  if (loading) {
    return (
      <section className="score-breakdown">
        <div className="score-breakdown-header">
          <ChartNoAxesCombined size={22} />
          <h2>Score Breakdown</h2>
        </div>

        <div className="score-breakdown-loading">
          <div className="score-loading-spinner"></div>
          <p>Calculating your scores...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="score-breakdown">
        <div className="score-breakdown-header">
          <ChartNoAxesCombined size={22} />
          <h2>Score Breakdown</h2>
        </div>

        <p className="score-breakdown-error">{error}</p>
      </section>
    );
  }

  const hasScores = scoreCategories.some(
    (category) => getScoreValue(category.key) !== null
  );

  return (
    <section className="score-breakdown">

      {/* Header */}
      <div className="score-breakdown-header">
        <div className="score-header-title">
          <ChartNoAxesCombined size={22} />
          <div>
            <h2>Score Breakdown</h2>
            <p>Detailed analysis of your resume</p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!hasScores ? (
        <div className="score-breakdown-empty">
          <ChartNoAxesCombined size={32} />
          <h3>No Scores Available</h3>
          <p>Analyze your resume to see the score breakdown.</p>
        </div>
      ) : (

        /* Score Categories */
        <div className="score-categories">

          {scoreCategories.map((category) => {
            const score = getScoreValue(category.key);
            const Icon = category.icon;

            return (
              <div
                className="score-category"
                key={category.key}
              >

                <div className="score-category-top">

                  <div className="score-category-info">
                    <div className="score-category-icon">
                      <Icon size={19} />
                    </div>

                    <div className="score-category-text">
                      <h3>{category.label}</h3>
                      <p>{category.description}</p>
                    </div>
                  </div>

                  {score !== null ? (
                    <div className="score-category-value">
                      <span className={`score-number ${getScoreColor(score)}`}>
                        {score}
                      </span>
                      <span className="score-total">/100</span>
                    </div>
                  ) : (
                    <span className="score-unavailable">
                      N/A
                    </span>
                  )}

                </div>

                {/* Progress Bar */}
                <div
                  className="score-progress-track"
                  role="progressbar"
                  aria-label={`${category.label} score`}
                  aria-valuenow={score ?? undefined}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className={`score-progress-fill ${
                      score !== null ? getScoreColor(score) : ""
                    }`}
                    style={{
                      width: `${score ?? 0}%`
                    }}
                  ></div>
                </div>

                <div className="score-category-footer">
                  <span>
                    {score !== null
                      ? getScoreLabel(score)
                      : "Not evaluated"}
                  </span>

                  <span>
                    {score !== null ? `${score}%` : "--"}
                  </span>
                </div>

              </div>
            );
          })}

        </div>
      )}

    </section>
  );
};

export default ScoreBreakdown;
