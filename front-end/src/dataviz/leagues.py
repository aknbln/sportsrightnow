import json

file = open("../../../back-end/data/Player-Info/Players.json")
data = json.load(file)

players_dict = {"NBA": 0, "NFL": 0, "MLB": 0}
for league in data:
    for team in data[league]:
        players_dict[league] += len(team["players"])


file = open("../../../back-end/data/Team-Info/Teams.json")
data = json.load(file)

teams_dict = {"NBA": 0, "NFL": 0, "MLB": 0}
for league in data:
    teams = data[league]["results"]
    teams_dict[league] += len(teams)

with open("league-players.json", "w") as outfile:
    json.dump(players_dict, outfile, indent=4)

with open("league-teams.json", "w") as outfile:
    json.dump(teams_dict, outfile, indent=4)
