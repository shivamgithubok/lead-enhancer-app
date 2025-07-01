import pandas as pd
from fastapi.responses import HTMLResponse, Response
from ydata_profiling import ProfileReport

def generate_profile_report(data):
    df = pd.DataFrame(data)
    profile = ProfileReport(df, title="Leads Data Profile", minimal=True)
    html_content = profile.to_html()
    headers = {
        'Content-Disposition': 'attachment; filename="leads_profile_report.html"'
    }
    return Response(content=html_content, media_type="text/html", headers=headers) 