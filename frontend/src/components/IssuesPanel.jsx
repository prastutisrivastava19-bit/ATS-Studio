
import React from "react";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Lightbulb
} from "lucide-react";

import "../styles/IssuesPanel.css";

const IssuesPanel = ({
  issues = [],
  suggestions = [],
  loading = false
}) => {

  const criticalIssues = issues.filter(
    (issue) => issue.severity === "critical"
  );

  const warningIssues = issues.filter(
    (issue) => issue.severity === "warning"
  );

  const infoIssues = issues.filter(
    (issue) => issue.severity === "info"
  );

  const getIssueIcon = (severity) => {
    switch (severity) {
      case "critical":
        return <AlertCircle size={19} />;

      case "warning":
        return <AlertTriangle size={19} />;

      case "info":
        return <Info size={19} />;

      default:
        return <Info size={19} />;
    }
  };

  const renderIssue = (issue, index) => (
    <div
      className={`issue-item issue-${issue.severity}`}
      key={issue.id || index}
    >
      <div className="issue-icon">
        {getIssueIcon(issue.severity)}
      </div>

      <div className="issue-content">
        <h4>{issue.title}</h4>
        <p>{issue.description}</p>

        {issue.recommendation && (
          <div className="issue-recommendation">
            <span>Recommendation:</span>
            <p>{issue.recommendation}</p>
          </div>
        )}
      </div>

      <span className={`issue-badge ${issue.severity}`}>
        {issue.severity}
      </span>
    </div>
  );

  if (loading) {
    return (
      <section className="issues-panel">
        <div className="issues-header">
          <h2>Issues & Improvements</h2>
        </div>

        <div className="issues-loading">
          <div className="issues-spinner"></div>
          <p>Analyzing resume issues...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="issues-panel">

      {/* Header */}
      <div className="issues-header">
        <div>
          <h2>Issues & Improvements</h2>
          <p>Problems detected in your resume</p>
        </div>

        <span className="total-issues">
          {issues.length} Issues
        </span>
      </div>

      {/* Critical Issues */}
      {criticalIssues.length > 0 && (
        <div className="issue-section">
          <div className="issue-section-heading critical-heading">
            <AlertCircle size={18} />
            <h3>Critical Issues ({criticalIssues.length})</h3>
          </div>

          <div className="issues-list">
            {criticalIssues.map(renderIssue)}
          </div>
        </div>
      )}

      {/* Warning Issues */}
      {warningIssues.length > 0 && (
        <div className="issue-section">
          <div className="issue-section-heading warning-heading">
            <AlertTriangle size={18} />
            <h3>Warnings ({warningIssues.length})</h3>
          </div>

          <div className="issues-list">
            {warningIssues.map(renderIssue)}
          </div>
        </div>
      )}

      {/* Informational Issues */}
      {infoIssues.length > 0 && (
        <div className="issue-section">
          <div className="issue-section-heading info-heading">
            <Info size={18} />
            <h3>Other Improvements ({infoIssues.length})</h3>
          </div>

          <div className="issues-list">
            {infoIssues.map(renderIssue)}
          </div>
        </div>
      )}

      {/* No Issues Found */}
      {issues.length === 0 && (
        <div className="no-issues">
          <CheckCircle2 size={35} />
          <h3>No Issues Found</h3>
          <p>Your resume has no reported issues in this analysis.</p>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions-section">
          <div className="suggestions-heading">
            <Lightbulb size={20} />
            <h3>Improvement Suggestions</h3>
          </div>

          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <div
                className="suggestion-item"
                key={suggestion.id || index}
              >
                <span className="suggestion-number">
                  {index + 1}
                </span>

                <div>
                  <h4>{suggestion.title}</h4>
                  <p>{suggestion.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
};

export default IssuesPanel;
