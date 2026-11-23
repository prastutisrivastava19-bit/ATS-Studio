
import React from "react";
import { useOutletContext } from "react-router-dom";
import IssuesPanel from "../components/IssuesPanel";

const Issues = () => {
  const { analysisResult } = useOutletContext();

  return (
    <div className="issues-page">
      <IssuesPanel
        issues={analysisResult?.issues || []}
        suggestions={analysisResult?.suggestions || []}
      />
    </div>
  );
};

export default Issues;
