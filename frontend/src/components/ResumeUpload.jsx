
import React, { useRef, useState } from "react";
import {
  Upload,
  FileText,
  File,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from "lucide-react";

import "../styles/ResumeUpload.css";

const ResumeUpload = ({
  file = null,
  onFileSelect,
  onRemove,
  disabled = false,
  uploading = false,
  error = "",
  maxSize = 5
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState("");

  const maxSizeInBytes = maxSize * 1024 * 1024;

  const allowedExtensions = [".pdf", ".docx"];

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Validate selected file
  const validateFile = (selectedFile) => {
    if (!selectedFile) return "Please select a file.";

    const fileName = selectedFile.name.toLowerCase();

    const isValidExtension = allowedExtensions.some(
      (extension) => fileName.endsWith(extension)
    );

    if (!isValidExtension) {
      return "Only PDF and DOCX files are allowed.";
    }

    if (selectedFile.size === 0) {
      return "The selected file is empty.";
    }

    if (selectedFile.size > maxSizeInBytes) {
      return `File size must not exceed ${maxSize} MB.`;
    }

    return "";
  };

  // Handle file selection
  const handleFile = (selectedFile) => {
    if (disabled || uploading) return;

    setValidationError("");

    const validationMessage = validateFile(selectedFile);

    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    onFileSelect?.(selectedFile);
  };

  // Browse files
  const handleBrowse = () => {
    if (disabled || uploading) return;

    fileInputRef.current?.click();
  };

  const handleInputChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }

    // Allows selecting the same file again
    event.target.value = "";
  };

  // Drag and drop
  const handleDragOver = (event) => {
    event.preventDefault();

    if (!disabled && !uploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled || uploading) return;

    const droppedFile = event.dataTransfer.files?.[0];

    if (!droppedFile) {
      setValidationError("Please drop a valid file.");
      return;
    }

    handleFile(droppedFile);
  };

  // Remove selected file
  const handleRemove = () => {
    if (disabled || uploading) return;

    setValidationError("");
    onRemove?.();
  };

  const displayedError = validationError || error;

  return (
    <section className="resume-upload-section">

      {/* Header */}
      <div className="resume-upload-header">
        <div className="resume-upload-title">
          <div className="resume-upload-icon">
            <FileText size={21} />
          </div>

          <div>
            <h2>Upload Your Resume</h2>
            <p>Upload your resume to get started with ATS analysis</p>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleInputChange}
        className="resume-hidden-input"
        disabled={disabled || uploading}
      />

      {/* Upload Area */}
      {!file ? (
        <div
          className={`resume-dropzone ${
            isDragging ? "dragging" : ""
          } ${disabled ? "upload-disabled" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowse}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleBrowse();
            }
          }}
          role="button"
          tabIndex={disabled || uploading ? -1 : 0}
          aria-label="Choose a resume file"
          aria-disabled={disabled || uploading}
        >
          <div className="resume-upload-symbol">
            <Upload size={30} />
          </div>

          <h3>
            {isDragging
              ? "Drop your resume here"
              : "Drag and drop your resume here"}
          </h3>

          <p>or click below to browse files</p>

          <button
            type="button"
            className="resume-browse-button"
            onClick={(event) => {
              event.stopPropagation();
              handleBrowse();
            }}
            disabled={disabled || uploading}
          >
            <Upload size={17} />
            Browse Files
          </button>

          <div className="resume-file-requirements">
            <span>PDF</span>
            <span>DOCX</span>
            <span>Maximum {maxSize} MB</span>
          </div>
        </div>
      ) : (

        /* Selected File */
        <div className="resume-selected-file">

          <div className="selected-file-icon">
            <File size={27} />
          </div>

          <div className="selected-file-details">
            <h3 title={file.name}>{file.name}</h3>
            <p>{formatFileSize(file.size)}</p>

            {uploading && (
              <p className="uploading-status">
                Uploading resume...
              </p>
            )}

            {!uploading && (
              <div className="file-success">
                <CheckCircle2 size={14} />
                File selected successfully
              </div>
            )}
          </div>

          <div className="selected-file-actions">
            {!uploading && !disabled && (
              <>
                <button
                  type="button"
                  className="replace-file-button"
                  onClick={handleBrowse}
                  title="Replace resume"
                >
                  <RefreshCw size={17} />
                </button>

                <button
                  type="button"
                  className="remove-file-button"
                  onClick={handleRemove}
                  title="Remove resume"
                >
                  <X size={19} />
                </button>
              </>
            )}

            {uploading && (
              <div className="file-upload-spinner"></div>
            )}
          </div>

        </div>
      )}

      {/* Error Message */}
      {displayedError && (
        <div className="resume-error-message" role="alert">
          <AlertCircle size={17} />
          <span>{displayedError}</span>
        </div>
      )}

      {/* Footer Information */}
      <div className="resume-upload-footer">
        <FileText size={15} />
        <p>
          Supported formats: PDF and DOCX. Your resume will be
          processed securely for ATS compatibility analysis.
        </p>
      </div>

    </section>
  );
};

export default ResumeUpload;
