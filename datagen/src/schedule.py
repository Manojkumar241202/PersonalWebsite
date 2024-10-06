import requests
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime

# Define your API endpoints
update_record_api = "http://localhost:8000/update_ratings"
reload_portfolio_api = "https://manojkumar-portfolio.onrender.com/ratings"

# Function to update the record in Firebase
def update_record():
    response = requests.post(update_record_api)
    if response.status_code == 200:
        print(f"Record updated successfully at {datetime.now()}")
    else:
        print(f"Failed to update record: {response.status_code} - {response.text}")

# Function to reload the portfolio
def reload_portfolio():
    response = requests.get(reload_portfolio_api)
    if response.status_code == 200:
        print(f"Portfolio reloaded successfully at {datetime.now()}")
    else:
        print(f"Failed to reload portfolio: {response.status_code} - {response.text}")

# Create an instance of BlockingScheduler
scheduler = BackgroundScheduler()

# Schedule update_record to run every day at 00:00
scheduler.add_job(update_record, 'interval', hours= 6)

# Schedule reload_portfolio to run every 15 minutes
scheduler.add_job(reload_portfolio, 'interval', minutes=10)
