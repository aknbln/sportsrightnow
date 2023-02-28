import requests
import json
from Scrape import create_json_file, SCRAPE_DIR_PATH

SCRAPE_DIR_NAME = "data/Player-Info"
NBA_PLAYERS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/NBA_Players.json"
PLAYERS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/Players.json"
#includes roster and other info from teams
def get_nba_players():
    url = "https://tank01-fantasy-stats.p.rapidapi.com/getNBATeams"

    querystring = {"schedules":"true","rosters":"true"}

    headers = {
        "X-RapidAPI-Key": "XXXXXXXXXX",
        "X-RapidAPI-Host": "tank01-fantasy-stats.p.rapidapi.com"
    }
    response = requests.request("GET", url, headers=headers, params=querystring)
    create_json_file(NBA_PLAYERS_JSON_PATH, response.json())

players = []
def filter_nba_players():
    f = open(f'./data/Player-Info/NBA_Players.json')
    jsonfile = json.load(f)
    nba_players ={
        'NBA':[]
        }

        
    

    for team in jsonfile['body']:
        cur_team = {
            'teamName': team['teamCity'] + team['teamName'],
            'players': []
            }


        
        for player_in_team in team['Roster']:
            player = team['Roster'][player_in_team]
            cur_team['players'].append(            
                {
                'name': player['espnName'],
                'espn': player['espnLink'],
                'logo': player['nbaComHeadshot'],
                'pos': player['pos'],
                'college': player['college'],
                'weight-pounds': player['weight'],
                'height-feet': player['height'],
                'jersey-num': player['jerseyNum'],
                'team-abbr': player['team'],
                'experience-years': player['exp'],
            })

        nba_players['NBA'].append(cur_team)
    
    create_json_file(PLAYERS_JSON_PATH, nba_players)





def main():
    #get_nba_players()
    filter_nba_players()

if __name__=="__main__":
    main()