import requests
import os
from typing import Dict, List, Optional
from datetime import datetime

# Hunter API configuration
HUNTER_API_KEY = "09af227de56528b9ca4b336499282d51a32a3477"
HUNTER_BASE_URL = "https://api.hunter.io/v2"

def fetch_email_from_hunter(domain: str, first_name: str, last_name: str) -> Optional[Dict]:
    """
    Fetch email from Hunter API using domain, first name, and last name
    """
    try:
        url = f"{HUNTER_BASE_URL}/email-finder"
        params = {
            "domain": domain,
            "first_name": first_name,
            "last_name": last_name,
            "api_key": HUNTER_API_KEY
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        if data.get("data") and data["data"].get("email"):
            return {
                "email": data["data"]["email"],
                "score": data["data"].get("score", 0),
                "sources": data["data"].get("sources", []),
                "domain": domain,
                "first_name": first_name,
                "last_name": last_name
            }
        else:
            return None
            
    except requests.RequestException as e:
        print(f"Error fetching email from Hunter API: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

def enrich_lead_with_email(lead_data: Dict) -> Dict:
    """
    Enrich lead data with email information from Hunter API
    """
    # Extract domain from company name or use a default domain
    company = lead_data.get("company", "").lower()
    domain = f"{company}.com" if company else "example.com"
    
    # For demo purposes, using sample names - in real implementation, 
    # you would extract these from your lead data
    first_name = "Alexis"  # This should come from your lead data
    last_name = "Ohanian"  # This should come from your lead data
    
    email_data = fetch_email_from_hunter(domain, first_name, last_name)
    
    if email_data:
        lead_data.update({
            "email": email_data["email"],
            "email_score": email_data["score"],
            "email_sources": email_data["sources"],
            "enriched_at": datetime.now().isoformat()
        })
    
    return lead_data

def fetch_leads():
    """
    Fetch leads and enrich them with email data from Hunter API
    """
    # Original mock data
    mock_leads = [
        {
            "id": 1,
            "company": "Stripe",
            "state": "CA",
            "phone": "123-456-7890",
            "source": "Crunchbase",
            "created": "2023-01-01",
            "updated": "2023-01-02"
        },
        {
            "id": 2,
            "company": "Plaid",
            "state": "NY",
            "phone": "987-654-3210",
            "source": "LinkedIn",
            "created": "2023-02-01",
            "updated": "2023-02-05"
        }
    ]
    
    # Enrich each lead with email data
    enriched_leads = []
    for lead in mock_leads:
        enriched_lead = enrich_lead_with_email(lead)
        enriched_leads.append(enriched_lead)
    
    return enriched_leads

def search_emails_by_domain(domain: str) -> List[Dict]:
    """
    Search for emails by domain using Hunter API
    """
    try:
        url = f"{HUNTER_BASE_URL}/domain-search"
        params = {
            "domain": domain,
            "api_key": HUNTER_API_KEY,
            "limit": 100
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        if data.get("data") and data["data"].get("emails"):
            return data["data"]["emails"]
        else:
            return []
            
    except requests.RequestException as e:
        print(f"Error searching emails by domain: {e}")
        return []
    except Exception as e:
        print(f"Unexpected error: {e}")
        return []
