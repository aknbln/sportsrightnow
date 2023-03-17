import requests
import json
from Scrape import create_json_file, SCRAPE_DIR_PATH

SCRAPE_DIR_NAME = "data/Player-Info"
NBA_PLAYERS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/NBA_Players.json"
NFL_PLAYERS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/NFL_Players.json"
PLAYERS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/Players.json"


# includes roster and other info from teams
def get_nba_players():
    url = "https://tank01-fantasy-stats.p.rapidapi.com/getNBATeams"

    querystring = {"schedules": "true", "rosters": "true"}

    headers = {
        "X-RapidAPI-Key": "XXXXXXXXXX",
        "X-RapidAPI-Host": "tank01-fantasy-stats.p.rapidapi.com",
    }
    response = requests.request("GET", url, headers=headers, params=querystring)
    create_json_file(NBA_PLAYERS_JSON_PATH, response.json())


players = []


def filter_nba_players():
    f = open(f"./data/Player-Info/NBA_Players.json")
    jsonfile = json.load(f)
    nba_players = {"NBA": []}

    for team in jsonfile["body"]:
        cur_team = {
            "teamName": team["teamCity"] + " " + team["teamName"],
            "players": [],
        }

        for player_in_team in team["Roster"]:
            player = team["Roster"][player_in_team]
            cur_team["players"].append(
                {
                    "name": player["espnName"],
                    "espn": player["espnLink"],
                    "logo": player["nbaComHeadshot"],
                    "pos": player["pos"],
                    "college": player["college"],
                    "weight-pounds": player["weight"],
                    "height-feet": player["height"],
                    "jersey-num": player["jerseyNum"],
                    "team-abbr": player["team"],
                    "experience-years": player["exp"],
                    "birthDay": player["bDay"],
                }
            )

        nba_players["NBA"].append(cur_team)

    create_json_file(PLAYERS_JSON_PATH, nba_players)


def get_nfl_players():
    url = "https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerList"

    headers = {
        "X-RapidAPI-Key": "0c466f6bcfmshcc828ed94ad95d9p13d7abjsn41fb37c9d661",
        "X-RapidAPI-Host": "tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com",
    }

    response = requests.request("GET", url, headers=headers)
    create_json_file(NFL_PLAYERS_JSON_PATH, response.json())


def filter_nfl_players():
    f = open("./data/Player-Info/NFL_Players.json")
    jsonfile = json.load(f)

    g = open(("./data/Player-Info/Players.json"))

    allPlayers = json.load(g)

    for player in jsonfile["body"]:
        cur_team = {"teamName": find_nfl_teamName(player["team"]), "players": []}

        cur_team["players"].append(
            {
                "name": player["espnName"],
                "espn": player["espnLink"],
                "logo": player["espnHeadshot"],
                "pos": player["pos"],
                "college": player["school"],
                "weight-pounds": player["weight"],
                "height-feet": player["height"],
                "jersey-num": player["jerseyNum"],
                "team-abbr": player["team"],
                "experience-years": player["exp"],
                "birthDay": player["bDay"],
                "age": player["age"],
            }
        )

        allPlayers["nfl"].append(cur_team)

    create_json_file(PLAYERS_JSON_PATH, allPlayers)


def find_nfl_teamName(abv):
    g = open("./data/Team-Info/Teams.json")
    nfl_json = json.load(g)
    nfl_teams = nfl_json["NFL"]

    for i in nfl_teams:
        print(i)
        if i["abbreviation"] == abv:
            return i["team"]

def add_teamIds():

    # get the teams from the file
    players_file = open("./data/Player-Info/Players.json")
    data = json.load(players_file)
    j = 1
    #go through each league
    for i in data:
        #go through each team
        for k in data[i]:
            k['team_id'] = find_teamId(k['teamName'])
            j+= 1
    
    create_json_file(PLAYERS_JSON_PATH, data)

def find_teamId(name):
    teams_file = open("./data/Team-Info/Teams.json")
    data = json.load(teams_file)
    for i in data:

        for k in data[i]['results']:
            if k['team'] == name:
                return k['team_id']


def main():
    # get_nba_players()
    # filter_nba_players()
    # get_nfl_players()
    #filter_nfl_players()
    add_teamIds()


if __name__ == "__main__":
    main()
