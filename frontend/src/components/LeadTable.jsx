import React, { useState, useEffect } from "react";
import EnrichButton from "./EnrichButton";
import ExportCSVButton from "./ExportCSVButton";
import CompanySearch from "./CompanySearch";
import { FaFilter, FaChartBar, FaRedo, FaSpinner } from "react-icons/fa";
import { mockLeads } from "../MokeData";
import "../style/table.css";

const allColumns = [
  { key: "company", label: "Company" },
  { key: "actions", label: "Actions" },
  { key: "industry", label: "Industry" },
  { key: "links", label: "Links" },
  { key: "product_category", label: "Product/Service Category" },
  { key: "business_type", label: "Business Type (B2B, B2B2C)" },
  { key: "employees_count", label: "Employees Count" },
  { key: "revenue", label: "Revenue" },
  { key: "year_founded", label: "Year Founded" },
  { key: "bbb_rating", label: "BBB Rating" },
  { key: "street", label: "Street" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "company_phone", label: "Company Phone" },
  { key: "source", label: "Source" },
  { key: "created", label: "Created Date" },
  { key: "updated", label: "Updated" },
  { key: "email", label: "Email" },
  { key: "email_score", label: "Email Score" },
  { key: "enrich", label: "Enrich" },
];

const rowOptions = [5,25, 50, 100, 1000, 'All'];

export default function LeadTable() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map(col => col.key));
  const [rowLimit, setRowLimit] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setLeads(mockLeads);
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    // Add search results to the main leads list
    setLeads(prevLeads => {
      // Remove any existing search results to avoid duplicates
      const filteredLeads = prevLeads.filter(lead => lead.source !== "Hunter API");
      return [...filteredLeads, ...results];
    });
  };

  const handleLoading = (loading) => {
    setIsLoading(loading);
  };

  const handleReset = () => {
    setLeads(mockLeads);
    setSearchResults([]);
    setSearchTerm("");
  };

  const handleEnrichComplete = (enrichedData) => {
    // Update the lead in the leads array with the enriched data
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === enrichedData.id 
          ? { ...lead, ...enrichedData, enriched_at: new Date().toISOString() }
          : lead
      )
    );
  };

  const filteredLeads = leads.filter((lead) =>
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleColumnToggle = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key)
        ? prev.filter((col) => col !== key)
        : [...prev, key]
    );
  };

  const displayedLeads = rowLimit === 'All' ? filteredLeads : filteredLeads.slice(0, rowLimit);

  const handleProfileReport = () => {
    window.open("http://localhost:8000/profile-report", "_blank");
  };

  const renderCellValue = (lead, colKey) => {
    const value = lead[colKey];
    
    if (colKey === "email_score" && value !== undefined) {
      // Render email score as a colored badge
      const score = parseInt(value);
      let color = "#666";
      if (score >= 80) color = "#10b981"; // Green
      else if (score >= 60) color = "#f59e0b"; // Yellow
      else if (score >= 40) color = "#f97316"; // Orange
      else color = "#ef4444"; // Red
      
      return (
        <span style={{
          background: color,
          color: "white",
          padding: "2px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600"
        }}>
          {score}%
        </span>
      );
    }
    
    if (colKey === "email" && value) {
      return (
        <span style={{ color: "#fbbf24", fontWeight: "500" }}>
          {value}
        </span>
      );
    }
    
    if (colKey === "links" && value) {
      return (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: "#fbbf24", textDecoration: "none" }}
        >
          {value}
        </a>
      );
    }
    
    return value || "";
  };

  return (
    <div className="lead-table-container" style={{ position: "relative", overflowX: "auto" }}>
      {/* Company Search Component */}
      <CompanySearch onSearchResults={handleSearchResults} onLoading={handleLoading} />
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Companies</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {searchResults.length > 0 && (
            <button
              onClick={handleReset}
              style={{
                background: "#374151",
                color: "#f3f3f3",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px"
              }}
            >
              <FaRedo size={14} />
              Reset
            </button>
          )}
          <label style={{ color: '#fbbf24', fontWeight: 600, marginRight: 8 }}>
            Rows:
            <select
              value={rowLimit}
              onChange={e => setRowLimit(e.target.value === 'All' ? 'All' : parseInt(e.target.value))}
              style={{ marginLeft: 6, borderRadius: 4, padding: '2px 8px', border: '1px solid #333', background: '#23233a', color: '#fbbf24' }}
            >
              {rowOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>
          <ExportCSVButton data={displayedLeads} />
          <button
            title="Profile Report"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={handleProfileReport}
          >
            <FaChartBar size={22} />
          </button>
          <button
            title="Filter"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setShowFilter(true)}
          >
            <FaFilter size={22} />
          </button>
        </div>
      </div>
      
      {/* Search Results Summary */}
      {searchResults.length > 0 && (
        <div style={{
          background: "#1e3a8a",
          color: "#dbeafe",
          padding: "12px 16px",
          borderRadius: "6px",
          marginBottom: "16px",
          border: "1px solid #3b82f6"
        }}>
          <strong>🔍 Search Results:</strong> Found {searchResults.length} email(s) for "{searchResults[0]?.company}" 
          from Hunter API. These results have been added to the table below.
        </div>
      )}
      
      {/* Filter Sidebar */}
      {showFilter && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "100vh",
            width: 280,
            background: "#23233a",
            boxShadow: "-2px 0 12px rgba(0,0,0,0.12)",
            zIndex: 1000,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            transition: "right 0.3s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ color: "#fbbf24" }}>Filter Columns</h3>
            <button onClick={() => setShowFilter(false)} style={{ background: "none", border: "none", color: "#fbbf24", fontSize: 20, cursor: "pointer" }}>×</button>
          </div>
          <div style={{ marginTop: 24 }}>
            {allColumns.map((col) => (
              <div key={col.key} style={{ marginBottom: 12 }}>
                <label style={{ color: "#f3f3f3", fontSize: 16 }}>
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => handleColumnToggle(col.key)}
                    style={{ marginRight: 8 }}
                    disabled={col.key === "enrich"} // Enrich column always visible
                  />
                  {col.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Loading Overlay */}
      {isLoading && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          borderRadius: "8px"
        }}>
          <div style={{
            background: "#23233a",
            padding: "24px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <FaSpinner className="fa-spin" size={20} />
            <span>Searching for company emails...</span>
          </div>
        </div>
      )}
      
      <div style={{ overflowX: "auto" }}>
        <table className="lead-table" style={{ minWidth: 1200 }}>
          <thead>
            <tr>
              {allColumns.map((col) =>
                visibleColumns.includes(col.key) && (
                  <th
                    key={col.key}
                    style={
                      col.key === "enrich"
                        ? {
                            position: "sticky",
                            right: 0,
                            background: "#20202f",
                            zIndex: 2,
                          }
                        : {}
                    }
                  >
                    {col.label}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {displayedLeads.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length}>No leads found.</td>
              </tr>
            ) : (
              displayedLeads.map((lead) => (
                <tr key={lead.id} style={{
                  background: lead.source === "Hunter API" ? "#1e3a8a20" : "transparent"
                }}>
                  {allColumns.map((col) => {
                    if (!visibleColumns.includes(col.key)) return null;
                    if (col.key === "enrich") {
                      return (
                        <td
                          key={col.key}
                          style={{
                            position: "sticky",
                            right: 0,
                            background: lead.source === "Hunter API" ? "#1e3a8a20" : "#23233a",
                            zIndex: 1,
                          }}
                        >
                          <EnrichButton id={lead.id} onEnrichComplete={handleEnrichComplete} />
                        </td>
                      );
                    }
                    return (
                      <td key={col.key}>
                        {renderCellValue(lead, col.key)}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}