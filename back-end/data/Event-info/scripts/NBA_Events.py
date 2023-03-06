import requests
import json

# Set API endpoint and parameters
url = "https://app.ticketmaster.com/discovery/v2/events"
params = {
    "apikey": "Mvar02Ff11Tc4ZF0RTy5l6wXypDguu4D",
    "keyword": "NBA",
    "locale": "*"
}

# Send GET request to API endpoint
response = requests.get(url, params=params)

# Check if request was successful
if response.status_code != 200:
    print(f"Request failed with status code {response.status_code}")
else:
    # Parse response JSON and extract NBA events
    response_json = json.loads(response.text)
    nba_events = response_json["_embedded"]["events"]
    
    # Save NBA events to JSON file
    with open("nba_events.json", "w") as f:
        json.dump({"NBA": nba_events}, f, indent=2)
