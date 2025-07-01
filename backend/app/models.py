from pydantic import BaseModel
from typing import Optional, List

class Lead(BaseModel):
    id: int
    company: str
    state: str
    phone: str
    source: str
    created: str
    updated: str

class EnrichedLead(Lead):
    email: Optional[str] = None
    domain: Optional[str] = None
    linkedin: Optional[str] = None
    score: Optional[int] = None
    email_score: Optional[int] = None
    email_sources: Optional[List[str]] = None
    enriched_at: Optional[str] = None