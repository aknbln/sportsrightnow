import json
import requests

def modify() :
    f = open("output.json", "r")
    data = json.load(f)
    f2 = open("output2.json", "r")
    data2 = json.load(f2)
    f3 = open("Teams.json", "r")
    data3 = json.load(f3)
    images = {}
    results = data3["NFL"]["results"]
    for result in results :
        images[result["team"]] = result["logo"]
        images[result["team"] + "1"] = result["team_id"]

    add = {}
    for item in data2 :
        # print(item)
        team = item["team"]
        if team != "Los Angeles Rams" :
            add[team] = item["stadium"]
            add[team + "1"] = item["hometeamimage"]
            add[team + "2"] = images[team]
            add[team + "3"] = images[team + "1"]
        

        # print(add)
    
    j = 1
    for event in data["NFL"] :
        #add fields to each event
        #add staticURL field to seatmap
        # if(event["homeTeam"] == "Los Angeles Rams") or (event["awayTeam"] == "Los Angeles Rams") :
        #     #delete this event
        #     data
        #     data["NFL"].remove(event)

        event["seatmap"] = {}
        event["date"] = {}


        ["dates"]["start"]

        event["id"] = j
        event["url"] = "past_event"
        event["localDate"][]
        event["seatmap"]["staticUrl"] = add.get(event["homeTeam"] + "1")
        event["venue"] = add.get(event["homeTeam"])
        event["hometeamimage"] = add.get(event["homeTeam"] + "2")
        event["homeTeamId"] = add.get(event["homeTeam"] + "3")
        event["awayTeamId"] = add.get(event["awayTeam"] + "3")
        j += 1

    #loop through each event in data["NFL"] and remove events that have "Los Angeles Rams" as home or away team
    for event in data["NFL"] :
        if(event["homeTeam"] == "Los Angeles Rams") or (event["awayTeam"] == "Los Angeles Rams") :
            #delete this event
            data["NFL"].remove(event)
    i = 1
    new_dict = {}
    #instantiate NFL key in new_dict
    new_dict["NFL"] = {}
    for event in data["NFL"]:
        
        #set "id" of event to i 

        event["id"] = i

        #create dict with key = "name" and value = event
        new_dict["NFL"][event["name"]] = event
        i += 1

    #write to output.json
    f = open("outputtt.json", "w")
    f.write(json.dumps(new_dict))
    f.close()

    



modify()