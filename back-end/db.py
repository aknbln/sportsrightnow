import json
from models import app, db, Player, Team, Event


def populate_db():
    populate_players()
    populate_teams()
    populate_events()


def populate_players():
    with open("data/Player-Info/Players.json") as f:
        leagues = json.load(f)
        league_names = ["NBA", "NFL", "MLB"]
        i = 0
        j = 1
        for league in leagues:
            for team in leagues[league]:
                for player in team["players"]:
                    if "name" in player:
                        db_row = {
                            # "id": player['name'] if 'name' in player else j,
                            "id": j,
                            "name": player["name"] if "name" in player else None,
                            "team": team["teamName"],
                            "team_id": team["team_id"],
                            "position": player["position"]
                            if "position" in player
                            else player["pos"]
                            if "pos" in player
                            else None,
                            "college": player["college"]
                            if "college" in player
                            else None,
                            "weight": player["weight-pounds"]
                            if "weight-pounds" in player
                            else None,
                            "height": player["height-feet"]
                            if "height-feet" in player
                            else None,
                            "birthdate": player["birthDay"]
                            if "birthDay" in player
                            else None,
                            "headshot": player["headshot"]
                            if "headshot" in player
                            else None,
                            "jersey": player["jersey-num"]
                            if "jersey-num" in player
                            else "0",
                            "league": league_names[i],
                            "espnLink": player["espnLink"]
                            if "espnLink" in player
                            else player["espn"]
                            if "espn" in player
                            else "",
                        }
                        j += 1
                        db.session.add(Player(**db_row))
            i += 1
        db.session.commit()


def populate_teams():
    with open("data/Team-Info/Teams.json") as f:
        leagues = json.load(f)
        for league in leagues:
            for team in leagues[league]["results"]:
                db_row = {
                    "id": team["team_id"],
                    "name": team["team"],
                    "league": league,
                    "division": team["division"],
                    "conference": team["conference"],
                    "rank": team["rank"],
                    "totalWins": team["totalWins"],
                    "totalLosses": team["totalLosses"],
                    "logo": team["logo"],
                    "city": team["location"]
                    # "stadium_name": team['stadium_name'],
                    # "espnLink": team['espnLink']
                }
                db.session.add(Team(**db_row))
        db.session.commit()


def populate_events():
    f2 = open("data/Team-info/Teams.json", "r")
    teams = json.load(f2)
    citiesdict = {}
    for team in teams["NFL"]["results"]:
        citiesdict[team["team"]] = team["location"]

    with open("data/Event-info/Events.json") as f:
        leagues = json.load(f)
        j = 1
        for league in leagues:
            for event in leagues[league]:
                if league != "NFL":
                    db_row = {
                        "id": j,
                        "name": leagues[league][event]["name"],
                        "url": leagues[league][event]["url"],
                        "league": league,
                        "local_date": leagues[league][event]["dates"]["start"][
                            "localDate"
                        ],
                        "local_time": leagues[league][event]["dates"]["start"][
                            "localTime"
                        ],
                        "seatmap": leagues[league][event]["seatmap"]["staticUrl"],
                        "city": leagues[league][event]["_embedded"][0]["city"]["name"],
                        "venue": leagues[league][event]["_embedded"][0]["name"],
                        "home_team": leagues[league][event]["homeTeam"]
                        if "homeTeam" in leagues[league][event]
                        else "",
                        "away_team": leagues[league][event]["awayTeam"]
                        if "awayTeam" in leagues[league][event]
                        else "",
                        "home_team_image": leagues[league][event]["hometeamimage"],
                        "home_team_id": leagues[league][event]["homeTeamId"],
                        "away_team_id": leagues[league][event]["awayTeamId"],
                    }
                else:
                    db_row = {
                        "id": j,
                        "name": leagues[league][event]["name"],
                        "url": leagues[league][event]["url"],
                        "league": "NFL",
                        "local_date": leagues[league][event]["local_date"],
                        "local_time": leagues[league][event]["local_date"],
                        "seatmap": leagues[league][event]["seatmap"]["staticUrl"],
                        "city": citiesdict[leagues[league][event]["homeTeam"]],
                        "venue": leagues[league][event]["venue"],
                        "home_team": leagues[league][event]["homeTeam"]
                        if "homeTeam" in leagues[league][event]
                        else "",
                        "away_team": leagues[league][event]["awayTeam"]
                        if "awayTeam" in leagues[league][event]
                        else "",
                        "home_team_image": leagues[league][event]["hometeamimage"],
                        "home_team_id": leagues[league][event]["homeTeamId"],
                        "away_team_id": leagues[league][event]["awayTeamId"],
                    }

                j += 1
                db.session.add(Event(**db_row))
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()
