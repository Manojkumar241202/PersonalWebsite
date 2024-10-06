import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


from fastapi import FastAPI
from firebase_admin import initialize_app, credentials, _apps
from src.api.routes import router
from dotenv import load_dotenv
from src.schedule import scheduler
import uvicorn
app = FastAPI()
app.include_router(router)
load_dotenv()
firebase_creds = {
    "type": os.getenv("FIREBASE_TYPE"),
    "project_id":os.getenv("FIREBASE_PROJECT_ID"),
    "private_key":os.getenv("FIREBASE_PRIVATE_KEY","").replace("\\n/g", '\n'),
    "client_email":os.getenv("FIREBASE_CLIENT_EMAIL"),
    "token_uri": os.getenv("FIREBASE_TOKEN_URI")
}

if not _apps:
    cert = credentials.Certificate(firebase_creds)
    initialize_app(cert)
    
app.include_router(router)

if __name__ == "__main__":
    try:
        print("Scheduler started. Waiting for jobs...")
        # Start the scheduler
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        print("Scheduler stopped.")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)
