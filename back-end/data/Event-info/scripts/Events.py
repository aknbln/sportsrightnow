import json

# Open the NBA and MLB cleaned JSON files
# with open('NBA_Cleaned.json') as nba_file, open('MLB_Cleaned.json') as mlb_file:
#     nba_cleaned = json.load(nba_file)
#     mlb_cleaned = json.load(mlb_file)

# # Combine the NBA and MLB JSONs under the NBA and MLB fields, respectively
# combined_data = {
#     "NBA": nba_cleaned["NBA"],
#     "MLB": mlb_cleaned["MLB"]
# }

def add_teams_to_events():

    e = open('../Events.json')
    events_file = json.load(e)

    t = open('../../Team-Info/Teams.json')
    teams_file = json.load(t)
    
    #NBA LIST
    for nba_events in events_file['NBA']:

        nba_event = events_file['NBA'][nba_events]

        firstTeamFound = False
        team1 = ""
        team2 = ""
        i1 = -1
        i2 = -1
        for team in teams_file['NBA']['results']:
            #print(team)
            if  not firstTeamFound and team['team'] in nba_event['name']:
                firstTeamFound = True
                i1 = nba_event['name'].index(team['team'])
                team1 = team['team']
            elif firstTeamFound and team['team'] in nba_event['name']:
                i2 = nba_event['name'].index(team['team'])
                team2 = team['team']
                break
        
        nba_event['homeTeam'] = team1 if (i1 < i2)  else team2
        nba_event['awayTeam'] = team1 if (i1 > i2)  else team2        


    #MLB LIST
    for nba_events in events_file['MLB']:
        nba_event = events_file['MLB'][nba_events]
        firstTeamFound = False
        team1 = ""
        team2 = ""
        i1 = -1
        i2 = -1
    for team in teams_file['MLB']['results']:
        if  not firstTeamFound and team['team'] in nba_event['name']:
            firstTeamFound = True
            i1 = nba_event['name'].index(team['team'])
            team1 = team['team']
        elif firstTeamFound and team['team'] in nba_event['name']:
            i2 = nba_event['name'].index(team['team'])
            team2 = team['team']
            break
    
    nba_event['homeTeam'] = team1 if (i1 < i2)  else team2
    nba_event['awayTeam'] = team1 if (i1 > i2)  else team2

    # #NFL LIST
    # for nba_events in events_file['NFL']:
    #     nba_event = events_file['NFL'][nba_events]
    #     firstTeamFound = False
    #     team1 = ""
    #     team2 = ""
    #     i1 = -1
    #     i2 = -1
    # for team in teams_file['NFL']['results']:
    #     if  not firstTeamFound and team['team'] in nba_event['name']:
    #         firstTeamFound = True
    #         i1 = nba_event['name'].index(team['team'])
    #         team1 = nba_event['name']
    #     elif firstTeamFound and team['team'] in nba_event['name']:
    #         i2 = nba_event['name'].index(team['team'])
    #         team2 = nba_event['name']
    #         break
    
    # nba_event['homeTeam'] = team1 if (i1 > i2)  else team2
    # nba_event['awayTeam'] = team1 if (i1 < i2)  else team2     

    with open('../Events.json', 'w') as file:
        json.dump(events_file, file, indent = 4)

add_teams_to_events()
# Write the combined JSON into a new file
# with open('Events.json', 'w') as f:
#     json.dump(combined_data, f)
