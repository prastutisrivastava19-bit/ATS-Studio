
import React from "react";
import { FileText, Trash2, Briefcase } from "lucide-react";
import "../styles/JobDescription.css";

const JobDescription = ({
  value = "",
  onChange,
  maxLength = 10000,
  disabled = false,
  error = "",
  required = false
}) => {

  const handleChange = (event) => {
    const newValue = event.target.value;

    if (newValue.length <= maxLength) {
      onChange?.(newValue);
    }
  };

  const handleClear = () => {
    onChange?.("");
  };

  return (
    <section className="job-description">

      {/* Header */}
      <div className="jd-header">
        <div className="jd-title">
          <div className="jd-icon">
            <Briefcase size={20} />
          </div>

          <div>
            <h2>Job Description</h2>
            <p>Paste the job description you're applying for</p>
          </div>
        </div>

        <FileText size={22} className="jd-header-icon" />
      </div>

      {/* Text Area */}
      <div className={`jd-input-wrapper ${error ? "jd-input-error" : ""}`}>

        <textarea
          className="jd-textarea"
          value={value}
          onChange={handleChange}
          placeholder="Paste the complete job description here...

For example:
• Job Title: Frontend Developer
• Required Skills: React.js, JavaScript, HTML, CSS
• Experience: 0-2 Years
• Responsibilities: Develop and maintain web applications..."
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          aria-label="Job description"
          aria-invalid={Boolean(error)}
        />

        <div className="jd-textarea-footer">

          <span className="jd-character-count">
            {value.length.toLocaleString()} / {maxLength.toLocaleString()} characters
          </span>

          <button
            type="button"
            className="jd-clear-button"
            onClick={handleClear}
            disabled={disabled || !value}
            aria-label="Clear job description"
          >
            <Trash2 size={15} />
            Clear
          </button>

        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="jd-error-message" role="alert">
          {error}
        </p>
      )}

      {/* Helper Text */}
      <div className="jd-helper">
        <FileText size={15} />
        <p>
          Adding a job description helps generate a more relevant
          ATS score based on the target role.
        </p>
      </div>

    </section>
  );
};

export default JobDescription;
