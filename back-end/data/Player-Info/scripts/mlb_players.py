import requests
import json

# set the API endpoint and parameters
url = "https://statsapi.mlb.com/api/v1/sports/1/players"
params = {
    "season": "2022",
    "hydrate": "team,position"
}

# send the request to the API and retrieve the data
response = requests.get(url, params=params)
data = response.json()

# initialize an empty dictionary to store the players by team
players_by_team = {}

# loop through the data and extract the relevant information
for player in data["people"]:
    name = player["fullName"]
    team = player["currentTeam"]["name"]
    height = player["height"]
    weight = player["weight"]
    current_age = player["currentAge"]
    # birth_city = player["birthCity"]

    # primary_number = player["primaryNumber"]
    # draft_year = player["draftYear"]
    birth_date = player["birthDate"]
    position = player["primaryPosition"]["abbreviation"]

    player_data = {
        "name": name,
        "team": team,
        "height": height,
        "weight": weight,
        # "primary_number": primary_number,
        # "draft_year": draft_year,
        "birth_date": birth_date,
        # "birth_city": birth_city,
        "current_age": current_age,
        "position": position
    }

    # player_data = {"name": name, "position": position}
    if team not in players_by_team:
        players_by_team[team] = []
    players_by_team[team].append(player_data)

# write the data to a JSON file
with open("MLB_Players_2022.json", "w") as file:
    json.dump(players_by_team, file)
