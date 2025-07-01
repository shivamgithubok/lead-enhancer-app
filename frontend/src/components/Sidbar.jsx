import React from "react";
import { FaBuilding, FaUser, FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>SaaSquatch Leads</h2>
      <nav>
        <ul>
          <li><FaBuilding style={{marginRight: '8px'}} /> Companies</li>
          <li><FaUser style={{marginRight: '8px'}} /> Persons</li>
          <li><FaEnvelope style={{marginRight: '8px'}} /> Email Generator</li>
          <li><FaLinkedin style={{marginRight: '8px'}} /> LinkedIn Messenger</li>
        </ul>
      </nav>
    </aside>
  );
}