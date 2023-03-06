import json

# Open the NBA and MLB cleaned JSON files
with open('NBA_Cleaned.json') as nba_file, open('MLB_Cleaned.json') as mlb_file:
    nba_cleaned = json.load(nba_file)
    mlb_cleaned = json.load(mlb_file)

# Combine the NBA and MLB JSONs under the NBA and MLB fields, respectively
combined_data = {
    "NBA": nba_cleaned["NBA"],
    "MLB": mlb_cleaned["MLB"]
}

# Write the combined JSON into a new file
with open('Events.json', 'w') as f:
    json.dump(combined_data, f)
