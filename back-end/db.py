
import json
from models import app, db, Player, Team, Event

import pymysql

# def test():
#     #may need to move this to top of models.py with the rest of the app.config stuff
#     conn = pymysql.connect(
#         host= 'sports-real.c2djuzvxaqfd.us-east-2.rds.amazonaws.com', 
#         port = '3306',
#         user = 'admin', 
#         password = 'sportsnow',
#         db = 'sports-real',
#         )
#     #logic for adding to table, test to see if it works after running the app
#     cursor=conn.cursor()
#     cursor.execute(populate_db)
#     cursor.commit()

def populate_db():
    populate_players()
    populate_teams()
    populate_events()


def populate_players():
    with open("data/Player-Info/Players.json") as f :
        leagues = json.load(f)
        league_names = ["NBA", "NFL", "MLB"]
        
        i = 0
        j = 0
        for league in leagues :
            
            for team in leagues[league] :
                
                for player in team["players"] :
                    
                    if'name' in player:
                        db_row = {
                            # "id": player['name'] if 'name' in player else j,
                            "id": j,
                            "name": player['name'] if 'name' in player else None,
                            # "team_id": team["teamName"],
                            "position": player["position"] if "position" in player else player["pos"] if "pos" in player else None,
                            "college" : player["college"] if "college" in player else None,
                            "weight" : player["weight-pounds"] if "weight-pounds" in player else None,
                            "height" : player["height-feet"] if "height-feet" in player else None,
                            "birthdate" : player["birthDay"] if "birthDay" in player else None,
                            "headshot" : player["headshot"] if "headshot" in player else None,
                            "jersey" : player["jersey-num"] if "jersey-num" in player else "0",
                            "league" : league_names[i]
                        }
                        j+= 1
                        db.session.add(Player(**db_row))
                
            i += 1    
        db.session.commit()


def populate_teams():
    with open("data/Team-Info/Teams.json") as f :
        leagues = json.load(f)
        j = 0
        for league in leagues :
            for team in leagues[league]["results"] :
                db_row = {
                    "id": team["team"] if "team" in team else j,
                    "name": team["team"],
                    "division" : team["division"],
                    "conference" : team["conference"],
                    "rank" : team["rank"],
                    "totalWins" : team["totalWins"],
                    "totalLosses" : team["totalLosses"],
                    "logo": team["logo"],
                    "city": team["location"],
                    "league": team["league"]
                }
                db.session.add(Team(**db_row))   
        db.session.commit()


def populate_events():
    with open("data/Event-info/Events.json") as f :
        leagues = json.load(f)
        j = 0
        for league in leagues :
            for event in leagues[league]:
                # print(leagues[league][event])
                # team = Team.query.filter_by(name=event["homeTeam"]).first().id
                db_row = {
                "id" : leagues[league][event]["name"],
                "name" : leagues[league][event]["name"],
                "url" : leagues[league][event]["url"], 
                "local_date" : leagues[league][event]["dates"]["start"]["localDate"],
                "local_time" : leagues[league][event]["dates"]["start"]["localTime"],
                "logo" : leagues[league][event]["seatmap"]["staticUrl"] if 'staticUrl' in leagues[league][event] else "",
                "city" : leagues[league][event]["_embedded"][0]["city"]["name"],
                "venue" : leagues[league][event]["_embedded"][0]["name"],
                "home_team" : leagues[league][event]["homeTeam"] if 'homeTeam' in leagues[league][event] else "",
                "away_team" : leagues[league][event]["awayTeam"] if 'awayTeam' in leagues[league][event] else ""
                }
                db.session.add(Event(**db_row))   
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()
