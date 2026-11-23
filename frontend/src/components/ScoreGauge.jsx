
import React from "react";
import "../styles/ScoreGauge.css";

const ScoreGauge = ({
  score = 0,
  size = 220,
  strokeWidth = 14,
  loading = false,
  error = "",
  label = "ATS Compatibility Score",
}) => {
  const validScore = Math.min(100, Math.max(0, Number(score) || 0));

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (validScore / 100) * circumference;

  const getScoreStatus = () => {
    if (validScore >= 80) return "Excellent";
    if (validScore >= 60) return "Good";
    if (validScore >= 40) return "Needs Improvement";
    return "Poor";
  };

  if (loading) {
    return (
      <div className="score-gauge-container">
        <div className="score-gauge-loading">
          <div className="score-gauge-loading-circle"></div>
          <p>Calculating score...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="score-gauge-container">
        <div className="score-gauge-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="score-gauge-container">
      <p className="score-gauge-label">{label}</p>

      <div
        className="score-gauge"
        style={{ width: size, height: size }}
        role="img"
        aria-label={`ATS score: ${validScore} out of 100`}
      >
        <svg
          className="score-gauge-svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            <linearGradient
              id="scoreGaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          <circle
            className="score-gauge-track"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />

          <circle
            className="score-gauge-progress"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="url(#scoreGaugeGradient)"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <div className="score-gauge-content">
          <span className="score-gauge-value">{validScore}</span>
          <span className="score-gauge-total">out of 100</span>
        </div>
      </div>

      <div className="score-gauge-status">
        <span className={`score-gauge-status-dot ${getScoreStatus()
          .toLowerCase()
          .replace(/\s+/g, "-")}`}></span>

        <span>{getScoreStatus()}</span>
      </div>
    </div>
  );
};

export default ScoreGauge;
