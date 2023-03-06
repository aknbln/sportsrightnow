import json

# Load the raw data from a file or API
with open('MLB_Players_2022.json', 'r') as f:
    raw_data = json.load(f)

# Create a dictionary to store the teams and their players
teams = {}

# Loop through each player in the raw data
for team in raw_data:
    # Get the team name and player info

    # print(raw_data[team])
    team_name = team

    for player in raw_data[team]:
        player_info = {key: player[key] for key in player if key != 'Team'}
        if team_name in teams:
            teams[team_name]['players'].append(player_info)
        else:
            teams[team_name] = {'teamName': team_name, 'players': [player_info]}


teams = {'MLB': list(teams.values())}


# Write the teams to a JSON file
with open('MLB_Players_prepped.json', 'w') as f:
    json.dump(teams, f, indent=4)
    # json.dump(list(teams.values()), f)
