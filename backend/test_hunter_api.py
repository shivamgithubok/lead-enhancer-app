#!/usr/bin/env python3
"""
Test script for Hunter API integration
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.scraper import fetch_email_from_hunter, search_emails_by_domain, fetch_leads

def test_email_finder():
    """Test the email finder functionality"""
    print("Testing Hunter API Email Finder...")
    
    # Test with the example from the API endpoint
    result = fetch_email_from_hunter(
        domain="reddit.com",
        first_name="Alexis",
        last_name="Ohanian"
    )
    
    if result:
        print(f"✅ Email found: {result['email']}")
        print(f"   Score: {result['score']}")
        print(f"   Sources: {result['sources']}")
    else:
        print("❌ No email found")
    
    return result

def test_domain_search():
    """Test the domain search functionality"""
    print("\nTesting Hunter API Domain Search...")
    
    # Test with a well-known domain
    emails = search_emails_by_domain("google.com")
    
    if emails:
        print(f"✅ Found {len(emails)} emails for google.com")
        for email in emails[:3]:  # Show first 3 emails
            print(f"   - {email.get('value', 'N/A')} ({email.get('type', 'N/A')})")
    else:
        print("❌ No emails found for domain")
    
    return emails

def test_enriched_leads():
    """Test the enriched leads functionality"""
    print("\nTesting Enriched Leads...")
    
    leads = fetch_leads()
    
    if leads:
        print(f"✅ Found {len(leads)} enriched leads")
        for lead in leads:
            print(f"   Company: {lead['company']}")
            if 'email' in lead:
                print(f"   Email: {lead['email']} (Score: {lead.get('email_score', 'N/A')})")
            else:
                print(f"   Email: Not found")
            print()
    else:
        print("❌ No leads found")
    
    return leads

if __name__ == "__main__":
    print("🧪 Testing Hunter API Integration\n")
    
    # Test email finder
    test_email_finder()
    
    # Test domain search
    test_domain_search()
    
    # Test enriched leads
    test_enriched_leads()
    
    print("\n✅ Testing completed!") 