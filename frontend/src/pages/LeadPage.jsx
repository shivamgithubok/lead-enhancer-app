import React from "react";
import Sidebar from "../components/Sidbar";
import Navbar from "../components/Navbar";
import LeadTable from "../components/LeadTable";
import "../style/layout.css";

export default function LeadPage() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <LeadTable />
      </div>
    </div>
  );
}