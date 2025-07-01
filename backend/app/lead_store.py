from app.scraper import fetch_leads
from app.models import Lead

leads = [Lead(**lead) for lead in fetch_leads()]

