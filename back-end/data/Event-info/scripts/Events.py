import json
import requests

# configure home team and away team
def add_teams_to_events():
    f = open("../Events.json")
    events = json.load(f)
    for mlbevents in events["MLB"]:
        nba_event = events["MLB"][mlbevents]
        # split the name of the event by vs to get the home and away team
        teams = nba_event["name"].split(" vs. ")
        if len(teams) == 2:
            nba_event["homeTeam"] = teams[0]
            nba_event["awayTeam"] = teams[1]

    with open("../Events.json", "w") as file:
        json.dump(events, file, indent=4)


# def add_event_image():
#     # url = "https://app.ticketmaster.com/discovery/v2/events"
#     # params = {
#     #     "apikey": "Mvar02Ff11Tc4ZF0RTy5l6wXypDguu4D",
#     #     "keyword": "MLB",
#     #     "locale": "*"
#     # }

#     # # Make a request to the API endpoint and get the JSON response
#     # response = requests.get(url, params=params)
#     # mlb_raw = json.loads(response.text)
#     api1 = "https://app.ticketmaster.com/discovery/v2/events/"
#     api2 = "/images?apikey=Mvar02Ff11Tc4ZF0RTy5l6wXypDguu4D&locale=*"
#     f = open('../Events.json')
#     events = json.load(f)
#     leagues = ["NBA", "MLB"]
#     for i in range (2) :
#         l = leagues[i]
#         for event in events[l]:
#             print(e)
#             url = api1 + event["id"] + api2
#             # Make a request to the API endpoint and get the JSON response
#             response = requests.get(url)
#             raw = json.loads(response.text)
#             for image in raw["images"] :
#                 if image["ratio"] == "4_3" :
#                     event["hometeamimage"] = image["url"]
#                     break

#             # event['hometeamimage'] = raw["images"]
#     with open('../Eventss.json', 'w') as file:
#         json.dump(events, file, indent = 4)

# def add_teams_to_events():

#     e = open('../Events.json')
#     events_file = json.load(e)


#     api1 = "https://app.ticketmaster.com/discovery/v2/events/"
#     api2 = "/images?apikey=Mvar02Ff11Tc4ZF0RTy5l6wXypDguu4D&locale=*"

# NBA LIST
# for nba_events in events_file['NBA']:
#     nba_event = events_file['NBA'][nba_events]
#     url = api1 + nba_event["id"] + api2
#     # Make a request to the API endpoint and get the JSON response
#     response = requests.get(url)
#     raw = json.loads(response.text)
#     for image in raw["images"] :
#         if image["ratio"] == "4_3" :
#             nba_event["hometeamimage"] = image["url"]

#             break

# nba_event = events_file['NBA'][nba_events]

# nba_event['homeTeam'] = team1 if (i1 < i2)  else team2
# nba_event['awayTeam'] = team1 if (i1 > i2)  else team2


# NBA LIST
# for nba_events in events_file['MLB']:
#     nba_event = events_file['MLB'][nba_events]
#     url = api1 + nba_event["id"] + api2
#     # Make a request to the API endpoint and get the JSON response
#     response = requests.get(url)
#     raw = json.loads(response.text)


#     for image in raw["images"] :
#         if image["ratio"] == "4_3" :
#             nba_event["hometeamimage"] = image["url"]
#             #split the name of the event by the "vs."
#             split = nba_event["name"].split(" vs. ")
#             if split[0] != None and split[1] != None:
#                 nba_event["homeTeam"] = split[0]
#                 nba_event["awayTeam"] = split[1]
#             break

#     # nba_event = events_file['NBA'][nba_events]

#     # nba_event['homeTeam'] = team1 if (i1 < i2)  else team2
#     # nba_event['awayTeam'] = team1 if (i1 > i2)  else team2

# # #NFL LIST
# # for nba_events in events_file['NFL']:
# #     nba_event = events_file['NFL'][nba_events]
# #     firstTeamFound = False
# #     team1 = ""
# #     team2 = ""
# #     i1 = -1
# #     i2 = -1
# # for team in teams_file['NFL']['results']:
# #     if  not firstTeamFound and team['team'] in nba_event['name']:
# #         firstTeamFound = True
# #         i1 = nba_event['name'].index(team['team'])
# #         team1 = nba_event['name']
# #     elif firstTeamFound and team['team'] in nba_event['name']:
# #         i2 = nba_event['name'].index(team['team'])
# #         team2 = nba_event['name']
# #         break

# # nba_event['homeTeam'] = team1 if (i1 > i2)  else team2
# # nba_event['awayTeam'] = team1 if (i1 < i2)  else team2

# with open('../Events.json', 'w') as file:
#     json.dump(events_file, file, indent = 4)

# add_teams_to_events()
add_teams_to_events()

# add_event_image()
# Write the combined JSON into a new file
# with open('Events.json', 'w') as f:
#     json.dump(combined_data, f)
