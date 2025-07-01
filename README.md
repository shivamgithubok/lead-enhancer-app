# README.md

##  AI-Enhanced Lead Generation Tool

This project enhances the functionality and design of the original [SaaSquatch Leads](https://www.saasquatchleads.com/) with a modern UI and enriched lead data insights, developed as part of the Caprae AI-Readiness Pre-Screening Challenge.

---

###  Features Implemented

*  **Search & Filter** — Easily search leads by company name.
*  **Export to CSV** — One-click export of filtered leads.
*  **Lead Scoring** — Smart lead scoring system for priority insights.
*  **Lead Enrichment** — Mock enrichment logic with email, domain & LinkedIn generation.
*  **Modular Architecture** — Scalable FastAPI backend and React frontend.
*  **Professional UI** — Responsive CSS-based layout mimicking original platform.
*  **pandas_profiling_creation** -- on clinking ot will gegenerate the report of the dataset for the ml moldle and visualization

---

###  Project Structure

```bash
lead-enhancer-tool/
├── frontend/                        # React App with plain CSS
│   ├── public/
│   │   └── index.html               # Standard HTML template
│
│   ├── src/
│   │   ├── assets/                  # Optional: logos, icons, mock lead files
│   │   │   └── leads.json
│   │
│   │   ├── components/              # Reusable UI pieces
│   │   │   ├── Navbar.jsx           # Top navigation
│   │   │   ├── Sidebar.jsx          # Sidebar navigation (Companies, etc.)
│   │   │   ├── LeadTable.jsx        # Lead display with enrich + export
│   │   │   ├── EnrichButton.jsx     # Enrich action button
│   │   │   ├── ExportCSVButton.jsx  # Export to CSV
│   │   │   ├── SearchBar.jsx        # Search/filter functionality
│   │   │   └── LeadScoreBadge.jsx   # Optional: Score visualization
│   │
│   │   ├── pages/
│   │   │   └── LeadPage.jsx         # Main page replicating UI from screenshot
│   │
│   │   ├── utils/
│   │   │   └── enrichLead.js        # Logic to enrich data via API or mock
│   │
│   │   ├── styles/
│   │   │   ├── global.css           # Global resets and typography
│   │   │   ├── table.css            # Table-specific styles
│   │   │   └── layout.css           # Flexbox grid layout
│   │
│   │   ├── mockData.js              # Optional: local JS lead array
│   │   ├── App.jsx                  # Root layout/router
│   │   └── index.js                 # React entry point
│
│   ├── package.json
│   └── README.md                    # Frontend setup instructions
│
├── backend/                         # FastAPI/Flask Backend (Optional for enrichment/scraping)
│   ├── app/
│   │   ├── main.py                  # App entry (FastAPI or Flask)
│   │   ├── routes.py                # Route handlers
│   │   ├── scraper.py               # Scraping logic fetch data from api
│   │   ├── enrich.py                # Enrichment logic (Clearbit/Simulated)
│   │   ├── lead_store.py            # In-memory DB or mock file-based storage
│   │   └── models.py                # Pydantic schemas (FastAPI) or input/output validation
│   ├── requirements.txt             # `fastapi`, `uvicorn`, etc.
│   └── README.md                    # API docs and run instructions
│
├── rationale.pdf                    # 1-pg report on choices & business value
├── walkthrough.mp4                  # 1–2 min demo video
├── .gitignore
└── README.md                        # Top-level readme (project summary + how to run)
```

---

###  Setup

#### Frontend:

```bash
cd frontend
npm install
npm start
```

#### Backend:

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

###  API Endpoints

| Endpoint           | Method | Description             |
| ------------------ | ------ | ----------------------- |
| `/leads`           | GET    | Fetch all leads         |
| `/leads/{lead_id}` | GET    | Get enriched lead by ID |

---

###  Future Scope

* Replace mock enrichment with APIs (e.g., Clearbit, Hunter.io)
* Add user authentication and team dashboards
* Enable CRM integration (HubSpot, Salesforce)

---

###  License

MIT License
