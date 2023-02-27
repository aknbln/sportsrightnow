import requests
import json
from Scrape import create_json_file, SCRAPE_DIR_NAME, SCRAPE_DIR_PATH


TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/Teams.json"
NBA_TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/NBA_Teams.json"
teams = {}
standings = {}

#THINGS WE HAVE TO DO

"""
    See if file exists and fetch it if not, doing that manually right now
"""

def get_nba_teams():
    url = "https://sportspage-feeds.p.rapidapi.com/teams"
    querystring_nba = {"league":"NBA"}
    headers = {
    "X-RapidAPI-Key": "0c466f6bcfmshcc828ed94ad95d9p13d7abjsn41fb37c9d661",
    "X-RapidAPI-Host": "sportspage-feeds.p.rapidapi.com"
    }


    #Get Basic Info about NBA TEAMS
    response = requests.request("GET", url, headers=headers, params=querystring_nba)
    #print(response.json())
    teams["NBA"] = response.json()


    #Populate info about NBA Teams



    

def get_nba_teams_info():
    # url = "https://api-nba-v1.p.rapidapi.com/standings"

    # querystring = {"league":"standard","season":"2022"}

    # headers = {
    #     "X-RapidAPI-Key": "0c466f6bcfmshcc828ed94ad95d9p13d7abjsn41fb37c9d661",
    #     "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
    # }

    # # response = requests.request("GET", url, headers=headers, params=querystring)

    # standings = response.json()
    # create_json_file(NBA_TEAMS_JSON_PATH, standings)

    f = open('./data/NBA_Teams.json')
    standings_data = json.load(f)
    #get the teams from the file 
    teams_file = open('./data/Teams.json')
    data = json.load(teams_file)

    # for i in standings["response"]:
    #     cur_team = data["NBA"][i["team"]["name"]]






print(TEAMS_JSON_PATH)
# get_nba_teams()
get_nba_teams_info()
# create_json_file(TEAMS_JSON_PATH, teams)


# querystring_nfl = {"league":"NFL"}
# querystring_mlb = {"league":"MLB"}
# headers = {
# 	"X-RapidAPI-Key": "0c466f6bcfmshcc828ed94ad95d9p13d7abjsn41fb37c9d661",
# 	"X-RapidAPI-Host": "sportspage-feeds.p.rapidapi.com"
# }


# response = requests.request("GET", url, headers=headers, params=querystring_nfl)
# teams["NFL"] = response.text
# response = requests.request("GET", url, headers=headers, params=querystring_mlb)
# teams["MLB"] = response.text

# print(response.text)