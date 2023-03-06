import requests
import json

# Set up the API endpoint URL and parameters
url = "https://app.ticketmaster.com/discovery/v2/events"
params = {
    "apikey": "Mvar02Ff11Tc4ZF0RTy5l6wXypDguu4D",
    "keyword": "MLB",
    "locale": "*"
}

# Make a request to the API endpoint and get the JSON response
response = requests.get(url, params=params)
mlb_raw = json.loads(response.text)

# Initialize the cleaned MLB JSON
mlb_cleaned = {}

# Loop through the events in the raw JSON and filter the desired fields
for event in mlb_raw['_embedded']['events']:
    #check if event.get("name") contains the word " v "
    #if it does, then add it to the cleaned JSON
    #if it doesn't, then skip it
    if " v " in event.get("name") or " vs. " in event.get("name"):
        cleaned_event = {
            "name": event.get("name"),
            "id": event.get("id"),
            "url": event.get("url"),
            "dates": event.get("dates"),
            "priceRanges": event.get("priceRanges"),
            "seatmap": event.get("seatmap"),
            "ticketLimit": event.get("ticketLimit"),
            "_embedded": event.get("_embedded", {}).get("venues")
        }
        # mlb_cleaned["MLB"].append(cleaned_event)
        event_name = event.get("name")
        mlb_cleaned[event_name] = cleaned_event

# Write the cleaned MLB JSON into a new file
with open('MLB_Cleaned.json', 'w') as f:
    json.dump({"MLB": mlb_cleaned}, f, indent=2)
