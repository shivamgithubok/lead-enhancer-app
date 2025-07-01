import React, { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import "../style/global.css";

export default function CompanySearch({ onSearchResults, onLoading }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    onLoading(true);

    try {
      // Call the backend API to search for companies
      const response = await fetch(`http://localhost:8000/hunter/domain-search?domain=${encodeURIComponent(searchTerm)}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // Transform the Hunter API response to match our lead format
        const transformedLeads = data.emails.map((email, index) => ({
          id: Date.now() + index, // Generate unique ID
          company: searchTerm,
          actions: "View/Edit",
          industry: "Technology", // Default value
          links: `https://${searchTerm}`,
          product_category: "Software", // Default value
          business_type: "B2B", // Default value
          employees_count: "Unknown",
          revenue: "Unknown",
          year_founded: "Unknown",
          bbb_rating: "N/A",
          street: "Unknown",
          city: "Unknown",
          state: "Unknown",
          company_phone: "Unknown",
          source: "Hunter API",
          created: new Date().toISOString().split('T')[0],
          updated: new Date().toISOString().split('T')[0],
          email: email.value,
          email_score: email.confidence || 0,
          email_sources: email.sources || [],
          domain: searchTerm
        }));

        onSearchResults(transformedLeads);
      } else {
        console.error("Search failed:", response.statusText);
        onSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      onSearchResults([]);
    } finally {
      setIsSearching(false);
      onLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="company-search-container" style={{
      background: "#23233a",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "20px",
      border: "1px solid #333"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        maxWidth: "600px"
      }}>
        <div style={{
          position: "relative",
          flex: 1
        }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter company domain (e.g., google.com, stripe.com)"
            style={{
              width: "100%",
              padding: "12px 16px",
              paddingLeft: "40px",
              borderRadius: "6px",
              border: "1px solid #444",
              background: "#1a1a2e",
              color: "#f3f3f3",
              fontSize: "14px"
            }}
          />
          <FaSearch 
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#666"
            }}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching || !searchTerm.trim()}
          style={{
            padding: "12px 24px",
            borderRadius: "6px",
            border: "none",
            background: isSearching ? "#666" : "#fbbf24",
            color: isSearching ? "#999" : "#1a1a2e",
            cursor: isSearching ? "not-allowed" : "pointer",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s"
          }}
        >
          {isSearching ? (
            <>
              <FaSpinner className="fa-spin" />
              Searching...
            </>
          ) : (
            <>
              <FaSearch />
              Search Company
            </>
          )}
        </button>
      </div>
      
      {searchTerm && (
        <div style={{
          marginTop: "12px",
          fontSize: "12px",
          color: "#888"
        }}>
          💡 Tip: Enter a domain like "google.com" or "stripe.com" to find company emails
        </div>
      )}
    </div>
  );
} 