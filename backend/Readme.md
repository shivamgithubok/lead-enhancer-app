
This is a simple FastAPI backend to simulate lead enrichment and fetching logic.

## 🛠️ Setup Instructions

1. **Install dependencies**:
```bash
pip install -r requirements.txt
```

2. **Run the app**:
```bash
uvicorn app.main:app --reload
```

3. **Endpoints**:
- `GET /leads` — Fetch all leads
- `GET /leads/{lead_id}` — Enrich lead by ID

Make sure to run this alongside your React frontend with appropriate CORS.


# Hunter API Integration

This document describes the integration of the Hunter API into the Lead Enhancer application.

## Overview

The Hunter API integration provides email finding and domain search capabilities to enrich lead data with contact information.

## Configuration

The Hunter API is configured with the following settings in `scraper.py`:

- **API Key**: 
- **Base URL**: `https://api.hunter.io/v2`

## API Endpoints

### 1. Email Finder
**Endpoint**: `GET /hunter/email-finder`

**Parameters**:
- `domain` (string): The company domain
- `first_name` (string): First name of the person
- `last_name` (string): Last name of the person

**Example**:
```
GET /hunter/email-finder?domain=reddit.com&first_name=Alexis&last_name=Ohanian
```

**Response**:
```json
{
  "email": "alexis@reddit.com",
  "score": 85,
  "sources": ["linkedin", "twitter"],
  "domain": "reddit.com",
  "first_name": "Alexis",
  "last_name": "Ohanian"
}
```

### 2. Domain Search
**Endpoint**: `GET /hunter/domain-search`

**Parameters**:
- `domain` (string): The company domain to search

**Example**:
```
GET /hunter/domain-search?domain=google.com
```

**Response**:
```json
{
  "domain": "google.com",
  "emails": [
    {
      "value": "sundar@google.com",
      "type": "personal",
      "confidence": 85
    }
  ],
  "count": 1
}
```

### 3. Enriched Leads
**Endpoint**: `GET /leads/enriched`

Returns all leads enriched with Hunter API data.

## Functions

### `fetch_email_from_hunter(domain, first_name, last_name)`
Fetches email information for a specific person at a domain.

### `search_emails_by_domain(domain)`
Searches for all emails associated with a domain.

### `enrich_lead_with_email(lead_data)`
Enriches lead data with email information from Hunter API.

### `fetch_leads()`
Fetches and enriches all leads with Hunter API data.

## Testing

Run the test script to verify the integration:

```bash
cd backend
python test_hunter_api.py
```

## Error Handling

The integration includes comprehensive error handling for:
- Network errors
- API rate limiting
- Invalid responses
- Missing data

## Dependencies

Make sure to install the required dependencies:

```bash
pip install -r requirements.txt
```

The `requests` library is required for HTTP communication with the Hunter API.

## Usage Examples

### Python Code Example

```python
from app.scraper import fetch_email_from_hunter, search_emails_by_domain

# Find email for a specific person
email_data = fetch_email_from_hunter("stripe.com", "John", "Doe")
if email_data:
    print(f"Found email: {email_data['email']}")

# Search all emails in a domain
emails = search_emails_by_domain("stripe.com")
print(f"Found {len(emails)} emails")
```

### API Usage Example

```bash
# Find email
curl "http://localhost:8000/hunter/email-finder?domain=reddit.com&first_name=Alexis&last_name=Ohanian"

# Search domain
curl "http://localhost:8000/hunter/domain-search?domain=google.com"

# Get enriched leads
curl "http://localhost:8000/leads/enriched"
```

## Notes

- The API key is currently hardcoded in the scraper.py file. In production, consider using environment variables.
- Rate limiting should be considered for production use.
- The integration automatically enriches leads with email data when `fetch_leads()` is called.
- Email scores and sources are included in the enriched data for quality assessment. 