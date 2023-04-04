import json
import requests


# configure home team and away team
def add_teams_to_events():
    f = open("../Events.json")
    events = json.load(f)
    for all_sport_events in events:
        for sport_events in events[all_sport_events]:
            print(sport_events)
            events[all_sport_events][sport_events]["homeTeamId"] = find_teamId(
                events[all_sport_events][sport_events]["homeTeam"]
            )
            events[all_sport_events][sport_events]["awayTeamId"] = find_teamId(
                events[all_sport_events][sport_events]["awayTeam"]
            )
            # split the name of the event by vs to get the home and away team
            # teams = nba_event["name"].split(" vs. ")
            # if len(teams) == 2:
            #     nba_event["homeTeam"] = teams[0]
            #     nba_event["awayTeam"] = teams[1]

    with open("../Events.json", "w") as file:
        json.dump(events, file, indent=4)


def add_events_mlb():
    url = "https://app.ticketmaster.com/discovery/v2/events"
    params = {
        "apikey": "Mvar02Ff11Tc4ZF0RTy5l6wXypDguu4D",
        "keyword": "MLB",
        "locale": "*",
    }
    response = requests.get(url, params=params)
    data = response.json()
    events = data["_embedded"]["events"]
    # make events be under "MLB" field
    data = {}
    # add first element of events as the first element in data["MLB"]
    data["MLB"] = [events[0]]
    # now put second element of events as the second element in data["MLB"]
    data["MLB"].append(events[1])
    # iterate though each element in data["MLB"]
    for event in events:
        newevent = {}
        newevent["name"] = event["name"]
        newevent["id"] = event["id"]
        newevent["url"] = event["url"]
        newevent["dates"] = event["dates"]
        newevent["priceRanges"] = event["priceRanges"]
        newevent["seatmap"] = event["seatmap"]
        newevent["ticketLimit"] = event["ticketLimit"]
        newevent["_embedded"] = event["_embedded"]
        newevent["homeTeam"] = event["homeTeam"]
        data["MLB"].append(newevent)
        print(event["name"])
    # open ./MLB_cleaned.json and add the events to it
    # instead of writing to the file, write to a new file
    # create new file
    # write to new file
    # rename new file to MLB_cleaned.json
    with open("output2.json", "w") as file:
        # print("hi")
        # print(events)
        json.dump(data, file, indent=4)


add_events_mlb()


def find_teamId(name):
    teams_file = open("../../../data/Team-Info/Teams.json")
    data = json.load(teams_file)
    for i in data:
        for k in data[i]["results"]:
            if k["team"] == name:
                return k["team_id"]


def add_stadName():
    teams_file = open("../../../data/Team-Info/Teams.json")
    teams_data = json.load(teams_file)

    events_file = open("../../../data/Event-Info/Events.json")
    events_data = json.load(events_file)
    # go through each league
    for i in events_data:
        # go through each team in the league
        for j in teams_data[i]["results"]:
            for event in events_data[i]:
                print(events_data[i][event]["homeTeamId"])
                if events_data[i][event]["homeTeamId"] == j["team_id"]:
                    j["stadium_name"] = events_data[i][event]["_embedded"]["name"]

    with open("../../Team-Info/Teams.json", "w") as file:
        json.dump(teams_data, file, indent=4)


# add_stadName()
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


# add_event_image()
# Write the combined JSON into a new file
# with open('Events.json', 'w') as f:
#     json.dump(combined_data, f)
