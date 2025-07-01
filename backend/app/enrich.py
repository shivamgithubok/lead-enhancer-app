import random
from app.models import Lead, EnrichedLead

def enrich_lead(lead: Lead) -> EnrichedLead:
    # Generate more realistic enrichment data
    company_name = lead.company.lower().replace(" ", "").replace(".", "")
    
    return EnrichedLead(
        **lead.dict(),
        email=f"info@{company_name}.com",
        domain=f"{company_name}.com",
        linkedin=f"https://linkedin.com/company/{company_name}",
        score=random.randint(50, 100),
        email_score=random.randint(60, 95),
        email_sources=["LinkedIn", "Company Website", "Hunter.io"],
        enriched_at="2024-01-15T10:30:00Z"
    )
