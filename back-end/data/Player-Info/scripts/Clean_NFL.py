import json

# Define the team abbreviation dictionary
team_abbreviations = {
    "ARI": "Arizona Cardinals",
    "ATL": "Atlanta Falcons",
    "BAL": "Baltimore Ravens",
    "BUF": "Buffalo Bills",
    "CAR": "Carolina Panthers",
    "CHI": "Chicago Bears",
    "CIN": "Cincinnati Bengals",
    "CLE": "Cleveland Browns",
    "DAL": "Dallas Cowboys",
    "DEN": "Denver Broncos",
    "DET": "Detroit Lions",
    "GB": "Green Bay Packers",
    "HOU": "Houston Texans",
    "IND": "Indianapolis Colts",
    "JAX": "Jacksonville Jaguars",
    "KC": "Kansas City Chiefs",
    "LV": "Las Vegas Raiders",
    "LAC": "Los Angeles Chargers",
    "LAR": "Los Angeles Rams",
    "MIA": "Miami Dolphins",
    "MIN": "Minnesota Vikings",
    "NE": "New England Patriots",
    "NO": "New Orleans Saints",
    "NYG": "New York Giants",
    "NYJ": "New York Jets",
    "PHI": "Philadelphia Eagles",
    "PIT": "Pittsburgh Steelers",
    "SF": "San Francisco 49ers",
    "SEA": "Seattle Seahawks",
    "TB": "Tampa Bay Buccaneers",
    "TEN": "Tennessee Titans",
    "WAS": "Washington Football Team"
}

# Load the JSON file
# with open("NFL_Players.json", "r") as file:
#     players = json.load(file)

# # Loop through each player and replace team abbreviation with team name
# for player in players:
#     team_abbrev = player["Team"].split()[-1]  # Get the team abbreviation
#     current_team = player["CurrentTeam"].split()[0]  # Get the current team name
#     CollegeDraftTeam = player["CollegeDraftTeam"].split()[0]  # Get the college draft team name
#     if player["UpcomingGameOpponent"]:  # Check if the player has an upcoming game
#         UpcomingGameOpponent = player["UpcomingGameOpponent"].split()[0]
#     # UpcomingGameOpponent = player["UpcomingGameOpponent"][0]  # Get the upcoming game opponent
#     if team_abbrev in team_abbreviations:  # Check if it's a valid abbreviation
#         player["Team"] = team_abbreviations[team_abbrev]  # Replace with team name
#     if current_team in team_abbreviations:  # Check if it's a valid abbreviation
#         player["CurrentTeam"] = team_abbreviations[current_team]  # Replace with team name
#     if CollegeDraftTeam in team_abbreviations:  # Check if it's a valid abbreviation
#         player["CollegeDraftTeam"] = team_abbreviations[CollegeDraftTeam]  # Replace with team name
#     if UpcomingGameOpponent in team_abbreviations:  # Check if it's a valid abbreviation
#         player["UpcomingGameOpponent"] = team_abbreviations[UpcomingGameOpponent]  # Replace with team name

def add_jerseyNums():
    file =  open("../NFL_Players.json")
    nfl_file = json.load(file)

    f = open('../Players.json') 
    players  = json.load(f)
    nfl_players = players['NFL']
    
    for teams in nfl_players:
        for player in teams['players']:
            for messy_data in nfl_file['body']:
                if player['Name'] == messy_data['espnName']:
                    player['name'] = messy_data['espnName']
                    player['jersey-num'] = messy_data['jerseyNum']
                    player['espnLink'] = messy_data['espnLink']
                    if player['College'] is None:
                        player['college'] = messy_data['school']
                    else:
                        player['college'] = player['College']

    with open('../Players.json', 'w') as file:
        json.dump(players, file, indent = 4)


add_jerseyNums()

# with open("NFL_Players_prepped.json", "w") as file:
#     json.dump(players, file, indent=4)
