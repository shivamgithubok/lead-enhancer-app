import React from "react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div style={{fontWeight: 'bold', fontSize: '1.2rem', color: '#fbbf24', letterSpacing: '1px'}}>Lead Enhancer</div>
      <div className="nav-links">
        <span>HOME</span>
        <span>SCRAPER</span>
        <span className="active">LEAD</span>
        <span>DOCUMENTATION</span>
        <span>CONTACT US</span>
      </div>
    </header>
  );
}