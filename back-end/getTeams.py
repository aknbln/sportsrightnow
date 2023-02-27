import requests
import json
from Scrape import create_json_file, SCRAPE_DIR_NAME, SCRAPE_DIR_PATH


TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/Teams.json"
NBA_TEAMS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/NBA_Teams.json"


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
def update_teams_info(league):
    f = open(f'./data/{league}_Teams.json')
    standings_data = json.load(f)

    #get the teams from the file 
    teams_file = open('./data/Teams.json')
    data = json.load(teams_file)

    for i in standings_data['response']:
        cur_team = find_elem(data[league]["results"], i['team']['name'])
        
        #assign more fields to the json object, modifies data object will have to write back to the file though
        cur_team['rank'] = i['conference']['rank']
        cur_team['totalWins'] =  i['conference']['win']
        cur_team['homeWins'] = i['win']['home']
        cur_team['awayWins'] = cur_team['totalWins'] - cur_team['homeWins']
        cur_team['totalLosses'] = i['conference']['loss']
        cur_team['logo'] = i['team']['logo']
        cur_team['winStreak'] = i['streak']
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

if __name__=="__main__":
    main()