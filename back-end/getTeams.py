import requests
import json
from Scrape import create_json_file, SCRAPE_DIR_NAME, SCRAPE_DIR_PATH


TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/Teams.json"
NBA_TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/NBA_Teams.json"
NFL_TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/NFL_Teams.json"
MLB_TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/MLB_Teams.json"
#THINGS WE HAVE TO DO

def get_teams(league):
    url = "https://sportspage-feeds.p.rapidapi.com/teams"
    querystring_nba = {"league": league}
    headers = {
    "X-RapidAPI-Key": "XXXXXXXXXX",
    "X-RapidAPI-Host": "sportspage-feeds.p.rapidapi.com"
    }
    #get the teams from the file 
    teams_file = open('./data/Teams.json')
    data = json.load(teams_file)

    #Get Basic Info about the league's team
    response = requests.request("GET", url, headers=headers, params=querystring_nba)

    data[league] = response.json()
    create_json_file(TEAMS_JSON_PATH, data)

    #Populate info about NBA Teams

def get_nfl_teams_info():
    url = "https://api-american-football.p.rapidapi.com/standings"

    querystring = {"league":"1","season":"2022"}

    headers = {
        "X-RapidAPI-Key": "0c466f6bcfmshcc828ed94ad95d9p13d7abjsn41fb37c9d661",
        "X-RapidAPI-Host": "api-american-football.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)
    create_json_file(NFL_TEAMS_JSON_PATH, response.json())
    
def get_mlb_teams_info():
    url = "https://api-baseball.p.rapidapi.com/standings"

    querystring = {"league":"1","season":"2022"}

    headers = {
        "X-RapidAPI-Key": "0c466f6bcfmshcc828ed94ad95d9p13d7abjsn41fb37c9d661",
        "X-RapidAPI-Host": "api-baseball.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)
    create_json_file(MLB_TEAMS_JSON_PATH, response.json())

#scrapes the NBA standings info
def get_nba_teams_info():
    url = "https://api-nba-v1.p.rapidapi.com/standings"

    querystring = {"league":"standard","season":"2022"}

    headers = {
        "X-RapidAPI-Key": "XXXXXXXXX",
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    standings = response.json()
    create_json_file(NBA_TEAMS_JSON_PATH, standings)


#update the teams info with details
def update_nba_teams_info():
    f = open(f'./data/NBA_Teams.json')
    standings_data = json.load(f)

    #get the teams from the file 
    teams_file = open('./data/Teams.json')
    data = json.load(teams_file)

    for i in standings_data['response']:
        cur_team = find_elem(data['NBA']["results"], i['team']['name'])
        
        #assign more fields to the json object, modifies data object will have to write back to the file though
        cur_team['rank'] = i['conference']['rank']
        cur_team['totalWins'] =  i['conference']['win']
        cur_team['homeWins'] = i['win']['home']
        cur_team['awayWins'] = cur_team['totalWins'] - cur_team['homeWins']
        cur_team['totalLosses'] = i['conference']['loss']
        cur_team['logo'] = i['team']['logo']
        cur_team['winStreak'] = i['streak']
        create_json_file(TEAMS_JSON_PATH, data)

def update_nfl_teams_info():
    f = open(f'./data/NFL_Teams.json')
    standings_data = json.load(f)

    #get the teams from the file 
    teams_file = open('./data/Teams.json')
    data = json.load(teams_file)

    for i in standings_data['response']:
        cur_team = find_elem(data['NFL']["results"], i['team']['name'])
        
        #assign more fields to the json object, modifies data object will have to write back to the file though
        cur_team['rank'] =  i['position']
        cur_team['totalWins'] =  i['won']
        cur_team['homeWins'] = int(i['records']['home'][0])
        cur_team['awayWins'] = cur_team['totalWins'] - cur_team['homeWins']
        cur_team['totalLosses'] = i['lost']
        cur_team['logo'] = i['team']['logo']
        cur_team['winStreak'] = i['streak']
        create_json_file(TEAMS_JSON_PATH, data)


#https://rapidapi.com/api-sports/api/api-baseball
def update_mlb_teams_info():
    f = open(f'./data/MLB_Teams.json')
    standings_data = json.load(f)

    #get the teams from the file 
    teams_file = open('./data/Teams.json')
    data = json.load(teams_file)

    for i in standings_data['response'][0]:
        cur_team = find_elem(data['MLB']['results'], i['team']['name'])
        #print(cur_team)
        
        #assign more fields to the json object, modifies data object will have to write back to the file though
        if(cur_team != None):
            cur_team['rank'] =  i['position']
            cur_team['totalWins'] =  i['games']['win']['total']
            cur_team['totalLosses'] = i['games']['lose']['total']
            cur_team['logo'] = i['team']['logo']
            cur_team['winStreak'] = 0
            create_json_file(TEAMS_JSON_PATH, data)


#Finds the element in the list
def find_elem(json_object, name):
    for dict in json_object:
        if dict['team'] == name:
            return dict


def main():

    #### STEPS DONE ####
    # get_teams("NBA")
    # get_teams("NFL")
    #get_teams("MLB")
    #update_nba_teams_info()

    ### NEXT STEPS
    i = 1
    #get_nfl_teams_info()
    #update_nfl_teams_info()

    #get_mlb_teams_info()
    #update_mlb_teams_info()


if __name__=="__main__":
    main()