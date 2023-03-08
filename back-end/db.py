
import json
from models import app, db, Player, Team, Event

def populate_db():
    populate_players()
    populate_teams()
    populate_events()


def populate_players():
    with open("data/Player-Info/Players.json") as f :
        leagues = json.load(f)
        league_names = ["NBA", "NFL", "MLB"]
        i = 0
        for league in leagues :
            for team in league :
                for player in team["players"] :
                    db_row = {
                        "id": player["name"],
                        "name": player["name"],
                        "team_id": team["teamName"],
                        "position": player["position"],
                        "college" : player["college"] if "college" in player else None,
                        "weight" : player["weight-pounds"] if "weight-pounds" in player else None,
                        "height" : player["height-feet"] if "height-feet" in player else None,
                        "birthdate" : player["birthDay"] if "birthDay" in player else None,
                        "headshot" : player["headshot"] if "headshot" in player else None,
                        "jersey" : player["jersey-num"] if "jersey" in player else None,
                        "league" : league_names[i]
                    }
                db.session.add(Player(**db_row))
            i += 1    
        db.session.commit()


def populate_teams():
    with open("data/Team-Info/Teams.json") as f :
        leagues = json.load(f)
        for league in leagues :
            for team in league["results"] :
                db_row = {
                    "id": team["team"],
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
        for league in leagues :
            for event in league :
                # team = Team.query.filter_by(name=event["homeTeam"]).first().id
                db_row = {
                "id" : event["name"],
                "name" : event["name"],
                "url" : event["url"],
                "local_date" : event["dates"]["start"]["localDate"],
                "local_time" : event["dates"]["start"]["localTime"],
                "logo" : event["seatmap"]["staticUrl"],
                "city" : event["_embedded"][0]["city"]["name"],
                "venue" : event["_embedded"][0]["name"],
                "home_team" : event["homeTeam"],
                "away_team" : event["awayTeam"]
                }
            db.session.add(Event(**db_row))   
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()
