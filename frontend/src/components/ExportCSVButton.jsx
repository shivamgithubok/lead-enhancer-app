import React from "react";
import { FaFileCsv, FaFileCode } from "react-icons/fa";

export default function ExportCSVButton({ data }) {
  const handleExportCSV = () => {
    const csv = data.map(row =>
      `${row.company},${row.state},${row.phone || row.company_phone || ""},${row.source},${row.created},${row.updated}`
    );
    const csvContent = ["Company,State,Phone,Source,Created,Updated", ...csv].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "leads.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", alignItems: "center" }}>
      <button title="Export CSV" onClick={handleExportCSV} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <FaFileCsv size={22} />
      </button>
      <button title="Export JSON" onClick={handleExportJSON} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <FaFileCode size={22} />
      </button>
    </div>
  );
}