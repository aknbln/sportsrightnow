import json

# Open the raw NBA JSON file
with open('NBA_Events.json') as f:
    nba_raw = json.load(f)

# Initialize the cleaned NBA JSON
nba_cleaned = {}

# Loop through the events in the raw JSON and filter the desired fields
for event in nba_raw['NBA']:
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
    event_name = event.get("name")
    nba_cleaned[event_name] = cleaned_event

# Write the cleaned NBA JSON into a new file
with open('NBA_Cleaned.json', 'w') as f:
    json.dump({"NBA": nba_cleaned}, f, indent=2)

