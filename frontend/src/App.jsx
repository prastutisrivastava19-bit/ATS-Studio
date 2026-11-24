
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import ResumeUpload from "./components/ResumeUpload";
import JobDescription from "./components/JobDescription";
import ScoreCard from "./components/ScoreCard";
import ScoreGauge from "./components/ScoreGauge";
import ScoreBreakdown from "./components/ScoreBreakdown";
import IssuesPanel from "./components/IssuesPanel";
import Suggestions from "./components/Suggestions";
import Issues from "./pages/Issues";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./App.css";

// Protect pages that require login
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// Dashboard layout
const AppLayout = ({ analysisResult }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="app-layout">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
        onLogout={handleLogout}
      />

      <div className="app-main">
        <Navbar onLogout={handleLogout} />
        <Outlet context={{ analysisResult }} />
      </div>
    </div>
  );
};

// Dashboard page
const Dashboard = ({
  resumeFile,
  setResumeFile,
  jobDescription,
  setJobDescription,
  analysisResult,
  setAnalysisResult,
}) => {
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const handleAnalyze = async () => {
    setAnalysisError("");
    setAnalysisResult(null);

    if (!resumeFile) {
      setAnalysisError("Please upload your resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      setAnalysisError("Please enter the job description.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setAnalysisError("Please log in again.");
      return;
    }

    setAnalysisLoading(true);

    try {
      // Step 1: Upload resume
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const uploadResponse = await fetch(
        "https://ats-studio-8cbm.onrender.com/api/resumes/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(
          uploadData.message || "Resume upload failed."
        );
      }

      const resumeId = uploadData.resume?._id;

      if (!resumeId) {
        throw new Error("Resume ID was not returned by the server.");
      }

      // Step 2: Analyze resume
      const analysisResponse = await fetch(
        `https://ats-studio-8cbm.onrender.com/api/resumes/${resumeId}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobDescription,
          }),
        }
      );

      const analysisData = await analysisResponse.json();

      if (!analysisResponse.ok) {
        throw new Error(
          analysisData.message || "Resume analysis failed."
        );
      }

      const result = analysisData.result;

      // Step 3: Store actual backend results
      setAnalysisResult({
        ...result,
        score: result.atsScore,
        previousScore: null,
        status:
          result.atsScore >= 80
            ? "Excellent"
            : result.atsScore >= 60
            ? "Good"
            : result.atsScore >= 40
            ? "Average"
            : "Needs Improvement",
        resumeId,
      });

    } catch (error) {
      setAnalysisError(
        error.message || "Something went wrong."
      );
    } finally {
      setAnalysisLoading(false);
    }
  };

  return (
    <main className="dashboard-page">
      <section className="dashboard-welcome">
        <div>
          <h1>Resume Dashboard</h1>
          <p>
            Analyze your resume and improve your chances of getting shortlisted.
          </p>
        </div>
      </section>

      <section className="dashboard-input-grid">
        <ResumeUpload
          file={resumeFile}
          onFileSelect={setResumeFile}
          onRemove={() => setResumeFile(null)}
          disabled={analysisLoading}
        />

        <JobDescription
          value={jobDescription}
          onChange={setJobDescription}
          disabled={analysisLoading}
          maxLength={10000}
        />
      </section>

      <div className="dashboard-analyze">
        <Button
          onClick={handleAnalyze}
          loading={analysisLoading}
          disabled={analysisLoading}
          size="large"
        >
          Analyze My Resume
        </Button>
      </div>

      {analysisError && (
        <p className="dashboard-error" role="alert">
          {analysisError}
        </p>
      )}

      {analysisResult && (
        <section className="dashboard-results">
          <div className="dashboard-section-heading">
            <div>
              <h2>Analysis Results</h2>
              <p>
                Here is how your resume performs against the job description.
              </p>
            </div>
          </div>

          <div className="dashboard-score-grid">
            <ScoreGauge score={analysisResult.score} />

            <ScoreCard
              score={analysisResult.score}
              previousScore={analysisResult.previousScore}
              status={analysisResult.status}
            />

            <ScoreBreakdown scores={analysisResult.scores} />
          </div>

          <div className="dashboard-analysis-grid">
            <IssuesPanel
              issues={analysisResult.issues}
              suggestions={[]}
            />

            <Suggestions
              suggestions={analysisResult.suggestions}
            />
          </div>
        </section>
      )}
    </main>
  );
};

// My Resumes page
const ResumesPage = ({ resumeFile }) => {
  return (
    <main className="dashboard-page">
      <div className="dashboard-welcome">
        <div>
          <h1>My Resumes</h1>
          <p>View your currently selected resume.</p>
        </div>
      </div>

      <div className="simple-page-card">
        {resumeFile ? (
          <>
            <h3>Selected Resume</h3>
            <p>{resumeFile.name}</p>
          </>
        ) : (
          <p>No resume has been uploaded yet.</p>
        )}
      </div>
    </main>
  );
};

// Issues page
const IssuesPage = () => {
  const { analysisResult } = require("react-router-dom").useOutletContext();

  return (
    <main className="dashboard-page">
      <div className="dashboard-welcome">
        <div>
          <h1>Issues & Suggestions</h1>
          <p>
            Review the improvements identified in your resume analysis.
          </p>
        </div>
      </div>

      {analysisResult ? (
        <div className="dashboard-analysis-grid">
          <IssuesPanel
            issues={analysisResult.issues}
            suggestions={[]}
          />

          <Suggestions
            suggestions={analysisResult.suggestions}
          />
        </div>
      ) : (
        <div className="simple-page-card">
          <p>
            Analyze your resume to see issues and suggestions here.
          </p>
        </div>
      )}
    </main>
  );
};

// Main application
const App = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <AppLayout analysisResult={analysisResult} />
            }
          >
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="/dashboard"
              element={
                <Dashboard
                  resumeFile={resumeFile}
                  setResumeFile={setResumeFile}
                  jobDescription={jobDescription}
                  setJobDescription={setJobDescription}
                  analysisResult={analysisResult}
                  setAnalysisResult={setAnalysisResult}
                />
              }
            />

            <Route
              path="/resumes"
              element={<ResumesPage resumeFile={resumeFile} />}
            />

            <Route
              path="/issues"
              element={<Issues />}
            />
          </Route>
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
