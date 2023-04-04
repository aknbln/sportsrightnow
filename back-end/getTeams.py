import requests
import json
from Scrape import create_json_file, SCRAPE_DIR_NAME, SCRAPE_DIR_PATH


TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/Teams.json"
NBA_TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/NBA_Teams.json"
NFL_TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/NFL_Teams.json"
MLB_TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/MLB_Teams.json"
# THINGS WE HAVE TO DO


def get_teams(league):
    url = "https://sportspage-feeds.p.rapidapi.com/teams"
    querystring_nba = {"league": league}
    headers = {
        "X-RapidAPI-Key": "XXXXXXXXXX",
        "X-RapidAPI-Host": "sportspage-feeds.p.rapidapi.com",
    }
    # get the teams from the file
    teams_file = open("./data/Teams.json")
    data = json.load(teams_file)

    # Get Basic Info about the league's team
    response = requests.request("GET", url, headers=headers, params=querystring_nba)

    data[league] = response.json()
    create_json_file(TEAMS_JSON_PATH, data)

    # Populate info about NBA Teams


def get_nfl_teams_info():
    url = "https://api-american-football.p.rapidapi.com/standings"

    querystring = {"league": "1", "season": "2022"}

    headers = {
        "X-RapidAPI-Key": "0c466f6bcfmshcc828ed94ad95d9p13d7abjsn41fb37c9d661",
        "X-RapidAPI-Host": "api-american-football.p.rapidapi.com",
    }

    response = requests.request("GET", url, headers=headers, params=querystring)
    create_json_file(NFL_TEAMS_JSON_PATH, response.json())


def get_mlb_teams_info():
    url = "https://api-baseball.p.rapidapi.com/standings"

    querystring = {"league": "1", "season": "2022"}

    headers = {
        "X-RapidAPI-Key": "0c466f6bcfmshcc828ed94ad95d9p13d7abjsn41fb37c9d661",
        "X-RapidAPI-Host": "api-baseball.p.rapidapi.com",
    }

    response = requests.request("GET", url, headers=headers, params=querystring)
    create_json_file(MLB_TEAMS_JSON_PATH, response.json())


# scrapes the NBA standings info
def get_nba_teams_info():
    url = "https://api-nba-v1.p.rapidapi.com/standings"

    querystring = {"league": "standard", "season": "2022"}

    headers = {
        "X-RapidAPI-Key": "XXXXXXXXX",
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    standings = response.json()
    create_json_file(NBA_TEAMS_JSON_PATH, standings)


# update the teams info with details
def update_nba_teams_info():
    teams_file = open("./data/Team-Info/Teams.json")
    data = json.load(teams_file)

    for i in data["NBA"]["results"]:
        print(str(i["abbreviation"]))
        print(str(i["team"].lower().replace(" ", "-")))
        # https://www.espn.com/nfl/team/_/name/mia/miami-dolphins
        i["espnLink"] = str(
            "https://www.espn.com/nba/team/_/name/"
            + str(i["abbreviation"])
            + "/"
            + str(i["team"].lower().replace(" ", "-"))
        )
        # assign more fields to the json object, modifies data object will have to write back to the file though

    create_json_file(TEAMS_JSON_PATH, data)


def update_nfl_teams_info():
    # get the teams from the file
    teams_file = open("./data/Team-Info/Teams.json")
    data = json.load(teams_file)

    for i in data["NFL"]["results"]:
        print(str(i["abbreviation"]))
        print(str(i["team"].lower().replace(" ", "-")))
        # https://www.espn.com/nfl/team/_/name/mia/miami-dolphins
        i["espnLink"] = str(
            "https://www.espn.com/nfl/team/_/name/"
            + str(i["abbreviation"])
            + "/"
            + str(i["team"].lower().replace(" ", "-"))
        )
        # assign more fields to the json object, modifies data object will have to write back to the file though

    create_json_file(TEAMS_JSON_PATH, data)


# https://rapidapi.com/api-sports/api/api-baseball
def update_mlb_teams_info():
    teams_file = open("./data/Team-Info/Teams.json")
    data = json.load(teams_file)

    for i in data["MLB"]["results"]:
        print(str(i["abbreviation"]))
        print(str(i["team"].lower().replace(" ", "-")))
        # https://www.espn.com/nfl/team/_/name/mia/miami-dolphins
        i["espnLink"] = str(
            "https://www.espn.com/mlb/team/_/name/"
            + str(i["abbreviation"])
            + "/"
            + str(i["team"].lower().replace(" ", "-"))
        )
        # assign more fields to the json object, modifies data object will have to write back to the file though

    create_json_file(TEAMS_JSON_PATH, data)


# Finds the element in the list
def find_elem(json_object, name):
    for dict in json_object:
        if dict["team"] == name:
            return dict


def add_teamIds():
    # get the teams from the file
    teams_file = open("./data/Team-Info/Teams.json")
    data = json.load(teams_file)
    j = 1
    for i in data:
        for k in data[i]["results"]:
            k["team_id"] = j
            j += 1

    create_json_file(TEAMS_JSON_PATH, data)


def main():
    #### STEPS DONE ####
    # get_teams("NBA")
    # get_teams("NFL")
    # get_teams("MLB")
    # update_nba_teams_info()

    ### NEXT STEPS
    i = 1
    # get_nfl_teams_info()
    # update_nfl_teams_info()

    # get_mlb_teams_info()
    # update_mlb_teams_info()
    # add_teamIds()


if __name__ == "__main__":
    main()
