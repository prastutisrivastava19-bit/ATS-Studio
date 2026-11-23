
import React from "react";
import {
  Lightbulb,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";

import "../styles/Suggestions.css";

const Suggestions = ({
  suggestions = [],
  loading = false,
  error = "",
  onSuggestionClick,
}) => {
  if (loading) {
    return (
      <div className="suggestions-container">
        <div className="suggestions-header">
          <div className="suggestions-heading">
            <div className="suggestions-icon">
              <Lightbulb size={20} />
            </div>
            <div>
              <h2>Improvement Suggestions</h2>
              <p>Personalized recommendations for your resume</p>
            </div>
          </div>
        </div>

        <div className="suggestions-loading">
          <div className="suggestions-spinner"></div>
          <p>Generating suggestions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="suggestions-container">
        <div className="suggestions-header">
          <div className="suggestions-heading">
            <div className="suggestions-icon">
              <Lightbulb size={20} />
            </div>
            <div>
              <h2>Improvement Suggestions</h2>
              <p>Personalized recommendations for your resume</p>
            </div>
          </div>
        </div>

        <div className="suggestions-error">
          <AlertCircle size={18} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="suggestions-container">
      {/* Header */}
      <div className="suggestions-header">
        <div className="suggestions-heading">
          <div className="suggestions-icon">
            <Lightbulb size={20} />
          </div>

          <div>
            <h2>Improvement Suggestions</h2>
            <p>Personalized recommendations for your resume</p>
          </div>
        </div>

        <div className="suggestions-count">
          <Sparkles size={14} />
          <span>{suggestions.length} suggestions</span>
        </div>
      </div>

      {/* Suggestions List */}
      {suggestions.length > 0 ? (
        <div className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <div
              className="suggestion-item"
              key={suggestion.id || index}
            >
              <div className="suggestion-number">
                {index + 1}
              </div>

              <div className="suggestion-content">
                <div className="suggestion-title-row">
                  <h3>{suggestion.title}</h3>

                  {suggestion.priority && (
                    <span
                      className={`suggestion-priority priority-${suggestion.priority.toLowerCase()}`}
                    >
                      {suggestion.priority}
                    </span>
                  )}
                </div>

                <p>{suggestion.description}</p>

                {suggestion.action && (
                  <div className="suggestion-action">
                    <CheckCircle2 size={15} />
                    <span>{suggestion.action}</span>
                  </div>
                )}

                {onSuggestionClick && (
                  <button
                    type="button"
                    className="suggestion-learn-more"
                    onClick={() => onSuggestionClick(suggestion)}
                  >
                    Learn more
                    <ArrowUpRight size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="suggestions-empty">
          <div className="suggestions-empty-icon">
            <CheckCircle2 size={25} />
          </div>

          <h3>No suggestions available</h3>
          <p>
            Complete your resume analysis to receive personalized
            improvement recommendations.
          </p>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
