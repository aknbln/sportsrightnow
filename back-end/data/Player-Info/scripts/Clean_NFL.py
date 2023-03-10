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
    "WAS": "Washington Football Team",
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
    file = open("../NFL_Players.json")
    nfl_file = json.load(file)

    f = open("../Players.json")
    players = json.load(f)
    nfl_players = players["NFL"]
    mlb_players = players["MLB"]
    nba_players = players["NBA"]
    for teams in nba_players:
        for player in teams["players"]:
            player["headshot"] = player["logo"]
            del player["logo"]

    # for teams in mlb_players:
    #     for player in teams['players']:
    #         #height currently looks like                     "height": "6' 2\"",
    #         #remove the \"
    #         temp = player['height'][:-1]
    #         del player['height']
    #         #remove the ' and replace with -
    #         player['height-feet'] = temp.replace("'", "-")
    #         player["weight-pounds"] = str(player['weight'])
    #         del player['weight']
    #         temp = player["birth_date"]
    #         dash = temp.replace('-', '/')
    #         player["birthDay"] = dash[5:8] + dash[8:] + dash[0:4]
    #         del player["birth_date"]

    # for teams in nfl_players:
    #     # print("number of teams: ", len(nfl_players))
    #     for player in teams['players']:
    #         # player['pos'] = player['Position']
    #         del player["PlayerID"]
    #         del player['Number']
    #         del player['College']
    #         del player['FirstName']
    #         del player['LastName']
    #         del player['Position']
    #         del player['Status']
    #         #turn player["HeightFeet"] from int to string
    #         play = player["HeightFeet"]
    #         player["height-feet"] = str(player["HeightFeet"]) + "-" + str(player["HeightInches"])
    #         del player["Height"]
    #         del player["HeightFeet"]
    #         del player["HeightInches"]
    #         player["weight-pounds"] = str(player['Weight'])
    #         del player["Weight"]
    #         del player["FantasyPosition"]
    #         del player["Active"]
    #         del player["PositionCategory"]
    #         del player["Name"]
    #         player["headshot"] = player["PhotoUrl"]
    #         fields = ["BirthDateString", "PhotoUrl", "ByeWeek", "UpcomingGameOpponent", "UpcomingGameWeek", "ShortName", "AverageDraftPosition", "DepthPositionCategory", "DepthPosition", "DepthOrder", "DepthDisplayOrder", "CurrentTeam", "CollegeDraftTeam", "CollegeDraftRound", "CollegeDraftPick", "IsUndraftedFreeAgent", "UpcomingOpponentRank", "UpcomingOpponentPositionRank", "CurrentStatus", "UpcomingSalary", "FantasyAlarmPlayerID", "SportRadarPlayerID", "RotoworldPlayerID", "RotoWirePlayerID", "StatsPlayerID", "SportsDirectPlayerID", "XmlTeamPlayerID", "FanDuelPlayerID", "DraftKingsPlayerID", "YahooPlayerID", "InjuryStatus", "InjuryBodyPart", "InjuryStartDate", "InjuryNotes", "FanDuelName", "DraftKingsName", "YahooName", "FantasyPositionDepthOrder", "InjuryPractice", "InjuryPracticeDescription", "DeclaredInactive", "UpcomingFanDuelSalary", "UpcomingDraftKingsSalary", "UpcomingYahooSalary", "TeamID", "GlobalTeamID", "FantasyDraftPlayerID", "FantasyDraftName", "UsaTodayPlayerID","UsaTodayHeadshotUrl", "UsaTodayHeadshotNoBackgroundUrl", "UsaTodayHeadshotUpdated", "UsaTodayHeadshotNoBackgroundUpdated",  "PlayerSeason", "LatestNews"]
    #         for field in fields:
    #             del player[field]
    #         #BirthDate looks like this"1994-12-12T00:00:00" so remove the "T00:00:00" and change "1994-12-12" to "12/12/1984"
    #         birthday_withoutT =  player['BirthDate'].split('T')[0]
    #         #now instead of "1994-12-12T00:00:00" it is "1994/12/12"
    #         #replace the - with /
    #         dash = birthday_withoutT.replace('-', '/')
    #         player["birthDay"] = dash[5:8] + dash[8:] + dash[0:4]
    #         del player["BirthDate"]
    #         del player["ExperienceString"]

    with open("../Players.json", "w") as file:
        json.dump(players, file, indent=4)


add_jerseyNums()

# with open("NFL_Players_prepped.json", "w") as file:
#     json.dump(players, file, indent=4)
