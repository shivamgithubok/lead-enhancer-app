from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from app.routes import router
from app.profile_report import generate_profile_report

app = FastAPI(title="Lead Enhancer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Lead Enhancer API is running!"}

@app.get("/leads")
def get_leads():
    # Return a list of mock leads as JSON
    return [
        {
            "id": 1,
            "company": "Stripe",
            "actions": "View/Edit",
            "industry": "Fintech",
            "links": "https://stripe.com",
            "product_category": "Payments",
            "business_type": "B2B",
            "employees_count": 4000,
            "revenue": "$7B",
            "year_founded": 2010,
            "bbb_rating": "A+",
            "street": "510 Townsend St",
            "city": "San Francisco",
            "state": "CA",
            "company_phone": "123-456-7890",
            "source": "Crunchbase",
            "created": "2023-01-01",
            "updated": "2023-01-02"
        },
        {
            "id": 2,
            "company": "Plaid",
            "actions": "View/Edit",
            "industry": "Fintech",
            "links": "https://plaid.com",
            "product_category": "APIs",
            "business_type": "B2B",
            "employees_count": 1200,
            "revenue": "$300M",
            "year_founded": 2013,
            "bbb_rating": "A",
            "street": "123 Market St",
            "city": "New York",
            "state": "NY",
            "company_phone": "987-654-3210",
            "source": "LinkedIn",
            "created": "2023-02-01",
            "updated": "2023-02-05"
        }
    ]

@app.get("/profile-report", response_class=HTMLResponse)
def profile_report():
    return generate_profile_report(get_leads())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
