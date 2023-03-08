import json
import requests

SCRAPE_DIR_PATH = "../"
SCRAPE_DIR_NAME = "data/Player-Info"
JSON_INDENT = 4
MLB_PLAYERS_JSON_PATH = SCRAPE_DIR_PATH + "/MLB_Headshots.json"

def load_MLB_data():
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


def getPhotoOfPlayer():
    # url = "https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBPlayerList"

    # headers = {
    #     "X-RapidAPI-Key": "0c466f6bcfmshcc828ed94ad95d9p13d7abjsn41fb37c9d661",
    #     "X-RapidAPI-Host": "tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com"
    # }

    # response = requests.request("GET", url, headers=headers)
    # create_json_file(MLB_PLAYERS_JSON_PATH, response.json())

    g = open('../MLB_Headshots.json')
    mlb_players_headshots = json.load(g)

    f = open('../Players.json') 
    players  = json.load(f)
    mlb_teams = players['MLB']

    for player_headshot in mlb_players_headshots['body']:
        for team in mlb_teams:
            
            for player in team['players']:

                if player['name'] == player_headshot['longName']:
                    player['jersey-num'] = player_headshot['jerseyNum']

    create_json_file('../Players.json', players)

def create_json_file(file_path, default_data = {}):
    """
    creates a json file with a list at the specified path if it does not exist
    """
    with open(file_path, 'w') as file:
        json.dump(default_data, file, indent = JSON_INDENT)


def main():
    # get_nba_players()
    # filter_nba_players()
    # get_nfl_players()
    getPhotoOfPlayer()

if __name__ == "__main__":
    main()


# Write the teams to a JSON file
# with open('MLB_Players_prepped.json', 'w') as f:
#     json.dump(teams, f, indent=4)
    # json.dump(list(teams.values()), f)
