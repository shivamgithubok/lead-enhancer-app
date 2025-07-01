from fastapi import APIRouter, HTTPException
from app.models import Lead, EnrichedLead
from app.scraper import fetch_leads, fetch_email_from_hunter, search_emails_by_domain
from app.enrich import enrich_lead
from app.lead_store import leads
from typing import List, Dict

router = APIRouter()

@router.get("/leads", response_model=list[Lead])
def get_leads():
    return leads

@router.get("/leads/{lead_id}", response_model=EnrichedLead)
def enrich(lead_id: int):
    # Instead of looking for the lead in the leads list, create mock enrichment data
    # This allows the frontend to enrich any lead regardless of its ID
    mock_lead = Lead(
        id=lead_id,
        company=f"Company{lead_id}",
        state="CA",
        phone="123-456-7890",
        source="Mock",
        created="2023-01-01",
        updated="2023-01-02"
    )
    return enrich_lead(mock_lead)

@router.get("/hunter/email-finder")
def find_email(domain: str, first_name: str, last_name: str):
    """
    Find email using Hunter API
    """
    email_data = fetch_email_from_hunter(domain, first_name, last_name)
    if email_data:
        return email_data
    else:
        raise HTTPException(status_code=404, detail="Email not found")

@router.get("/hunter/domain-search")
def search_domain_emails(domain: str):
    """
    Search for all emails in a domain using Hunter API
    """
    emails = search_emails_by_domain(domain)
    return {"domain": domain, "emails": emails, "count": len(emails)}

@router.get("/leads/enriched", response_model=List[EnrichedLead])
def get_enriched_leads():
    """
    Get leads enriched with Hunter API data
    """
    return fetch_leads()

@router.get("/api/leads")
def get_api_leads():
    """
    Get leads in the format expected by the frontend
    """
    enriched_leads = fetch_leads()
    return enriched_leads
