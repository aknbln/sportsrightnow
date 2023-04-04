import json
from operator import itemgetter

file = open("../../../back-end/data/Player-Info/Players.json")
data = json.load(file)

data_list = []
# Get size of each team
for league in data:
    for team in data[league]:
        subdict = {
            "team": team["teamName"],
            "league": league,
            "playerCount": len(team["players"]),
            "winRate": 0,
        }
        data_list.append(subdict)
        # print('{name:"', teams["teamName"], '",count:', len(teams["players"]), ',league:"', league, '"},',  sep='')

# Get win rate of each team
file = open("../../../back-end/data/Team-Info/Teams.json")
data = json.load(file)
for l in data:
    league = data[l]["results"]
    for team in league:
        if team["totalLosses"] > 0:
            name = team["team"]
            winRate = team["totalWins"] / (team["totalLosses"] + team["totalWins"])
            winRate *= 100
            winRate = int(winRate)

            for t in data_list:
                if t["team"] == name:
                    t["winRate"] = winRate

data_list = sorted(data_list, key=itemgetter("winRate"), reverse=True)
with open("teamsize.json", "w") as outfile:
    json.dump(data_list, outfile, indent=4)
