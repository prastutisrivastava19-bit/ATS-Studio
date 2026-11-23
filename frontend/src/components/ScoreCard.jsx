
import React from "react";
import { Target, TrendingUp, TrendingDown } from "lucide-react";
import "../styles/ScoreCard.css";

const ScoreCard = ({
  score = 0,
  previousScore = null,
  status = "",
  loading = false,
  error = "",
}) => {
  const validScore = Math.min(100, Math.max(0, Number(score) || 0));

  const getScoreStatus = () => {
    if (status) return status;

    if (validScore >= 80) return "Excellent";
    if (validScore >= 60) return "Good";
    if (validScore >= 40) return "Needs Improvement";

    return "Poor";
  };

  const scoreDifference =
    previousScore !== null && previousScore !== undefined
      ? validScore - Number(previousScore)
      : null;

  if (loading) {
    return (
      <div className="score-card score-card-loading">
        <div className="score-card-header">
          <div className="score-card-icon">
            <Target size={20} />
          </div>
          <span>Overall ATS Score</span>
        </div>

        <div className="score-card-skeleton"></div>
        <p>Calculating your ATS score...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="score-card score-card-error">
        <div className="score-card-header">
          <div className="score-card-icon">
            <Target size={20} />
          </div>
          <span>Overall ATS Score</span>
        </div>

        <p className="score-card-error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="score-card">
      <div className="score-card-header">
        <div className="score-card-icon">
          <Target size={20} />
        </div>

        <span>Overall ATS Score</span>
      </div>

      <div className="score-card-content">
        <div className="score-card-score">
          <span className="score-value">{validScore}</span>
          <span className="score-total">/100</span>
        </div>

        <div className="score-card-status">
          <span className={`score-status-dot ${getScoreStatus()
            .toLowerCase()
            .replace(/\s+/g, "-")}`}></span>

          <span>{getScoreStatus()}</span>
        </div>
      </div>

      <div className="score-card-progress">
        <div
          className="score-card-progress-fill"
          style={{ width: `${validScore}%` }}
        ></div>
      </div>

      <div className="score-card-footer">
        <span>Resume compatibility</span>

        {scoreDifference !== null && (
          <span
            className={`score-card-trend ${
              scoreDifference >= 0 ? "trend-positive" : "trend-negative"
            }`}
          >
            {scoreDifference >= 0 ? (
              <TrendingUp size={15} />
            ) : (
              <TrendingDown size={15} />
            )}

            {Math.abs(scoreDifference)} points
          </span>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
