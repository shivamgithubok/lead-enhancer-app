import React from "react";

export default function LeadScoreBadge({ score }) {
  const getColor = (score) => {
    if (score > 80) return "limegreen";
    if (score > 50) return "gold";
    return "crimson";
  };

  return (
    <span style={{ color: getColor(score), fontWeight: "bold" }}>{score}</span>
  );
}