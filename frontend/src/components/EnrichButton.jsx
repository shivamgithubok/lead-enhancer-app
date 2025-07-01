import React, { useState } from "react";
import { enrichLead } from "../utils/enrichLead";

export default function EnrichButton({ id, onEnrichComplete }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnrich = async () => {
    setIsLoading(true);
    try {
      const enrichedData = await enrichLead(id);
      console.log('Lead enriched successfully:', enrichedData);
      
      // Call the callback to update the parent component
      if (onEnrichComplete) {
        onEnrichComplete(enrichedData);
      }
      
      // Show success message
      alert(`Lead ${id} enriched successfully! Email: ${enrichedData.email}, Score: ${enrichedData.score}`);
    } catch (error) {
      console.error('Failed to enrich lead:', error);
      alert(`Failed to enrich lead ${id}: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleEnrich} 
      disabled={isLoading}
      style={{
        padding: "6px 12px",
        borderRadius: "4px",
        border: "none",
        background: isLoading ? "#666" : "#fbbf24",
        color: isLoading ? "#999" : "#1a1a2e",
        cursor: isLoading ? "not-allowed" : "pointer",
        fontSize: "12px",
        fontWeight: "600",
        minWidth: "80px"
      }}
    >
      {isLoading ? "Enriching..." : "Enrich"}
    </button>
  );
}