from flask import jsonify, request, Response
from models import app, db, Player, Team, Event
from schema import player_schema, team_schema, event_schema
from sqlalchemy import or_
import json
import datetime

# code adapted from GeoJobs!
# misc
# python3 -m virtualenv venv
# source ./venv/bin/activate


@app.route("/")
def home():
    try:
        return "SportsRightNowAPIDatabase"
    except Exception as e:
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = "<h1>Something is broken.</h1>"
        return hed + error_text


@app.route("/search/<string:query>")
def search_all(query):
    terms = query.split()
    occurrences = {
        **search_players(terms),
        **search_teams(terms),
        **search_events(terms),
    }
    objs = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
    players = [player for player in objs if type(player) == Player]
    teams = [team for team in objs if type(team) == Team]
    events = [event for event in objs if type(event) == Event]
    player_results = player_schema.dump(players, many=True)
    team_results = team_schema.dump(teams, many=True)
    event_results = event_schema.dump(events, many=True)
    return jsonify(
        {"players": player_results, "teams": team_results, "events": event_results}
    )


@app.route("/search/<string:model>/<string:query>")
def search_models(model, query):
    model = model.strip().lower()
    terms = query.split()
    result = None
    if model == "players":
        occurrences = search_players(terms)
        players = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
        result = player_schema.dump(players, many=True)
    elif model == "teams":
        occurrences = search_teams(terms)
        cities = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
        result = team_schema.dump(cities, many=True)
    elif model == "events":
        occurrences = search_events(terms)
        events = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
        result = event_schema.dump(events, many=True)
    else:
        return_error(f"Invalid model: {model}")
    return jsonify({"data": result})


def search_players(terms):
    occurrences = {}
    for term in terms:
        queries = []
        queries.append(Player.name.contains(term))
        queries.append(Player.team.contains(term))
        queries.append(Player.team_id.contains(term))
        queries.append(Player.position.contains(term))
        queries.append(Player.college.contains(term))
        queries.append(Player.jersey.contains(term))
        queries.append(Player.league.contains(term))

        players = Player.query.filter(or_(*queries))
        for player in players:
            if not player in occurrences:
                occurrences[player] = 1
            else:
                occurrences[player] += 1
    return occurrences


def search_teams(terms):
    occurrences = {}
    for term in terms:
        queries = []
        queries.append(Team.id.contains(term))
        queries.append(Team.name.contains(term))
        queries.append(Team.league.contains(term))
        queries.append(Team.division.contains(term))
        queries.append(Team.conference.contains(term))
        queries.append(Team.city.contains(term))
        queries.append(Team.rank.contains(term))
        queries.append(Team.totalWins.contains(term))
        queries.append(Team.totalLosses.contains(term))
        teams = Team.query.filter(or_(*queries))

        for team in teams:
            if not team in occurrences:
                occurrences[team] = 1
            else:
                occurrences[team] += 1
    return occurrences


def search_events(terms):
    occurrences = {}
    for term in terms:
        queries = []
        queries.append(Event.id.contains(term))
        queries.append(Event.name.contains(term))
        queries.append(Event.league.contains(term))
        queries.append(Event.local_date.contains(term))
        queries.append(Event.city.contains(term))
        queries.append(Event.venue.contains(term))
        queries.append(Event.home_team.contains(term))
        queries.append(Event.away_team.contains(term))
        queries.append(Event.home_team_id.contains(term))
        queries.append(Event.away_team_id.contains(term))
        events = Event.query.filter(or_(*queries))
        for event in events:
            if not event in occurrences:
                occurrences[event] = 1
            else:
                occurrences[event] += 1
    return occurrences


@app.route("/players")
def get_players():
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    name = request.args.get("name", type=str)
    team = request.args.get("team", type=str)
    college = request.args.get("college", type=str)
    jerseyNum = request.args.get("jerseyNum", type=str)
    league = request.args.get("league", type=str)

    query = db.session.query(Player)
    count = query.count()

    # FILTER
    if name is not None:
        query = query.filter(Player.name.like("%" + name + "%"))

    if team is not None:
        query = query.filter(Player.team.like("%" + name + "%"))

    if college is not None:
        query = query.filter(Player.college.like("%" + college + "%"))

    if jerseyNum is not None:
        query = query.filter(Player.jersey == jerseyNum)

    if league is not None:
        query = query.filter(Player.league == league)

    # PAGINATION
    if page is not None:
        query = paginate(query, page, perPage)

    result = player_schema.dump(query, many=True)
    response = jsonify({"data": result, "meta": {"count": count}})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/teams")
def get_teams():
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    name = request.args.get("name", type=str)
    league = request.args.get("league", type=str)
    win = request.args.get("win", type=int)
    loss = request.args.get("loss", type=int)
    city = request.args.get("city", type=str)
    query = db.session.query(Team)
    count = query.count()

    # FILTER
    if name is not None:
        query = query.filter(Team.name.like("%" + name + "%"))

    if league is not None:
        query = query.filter(Team.league == league)

    if win is not None:
        query = query.filter(Team.totalWins >= win)

    if loss is not None:
        query = query.filter(Team.totalLosses <= loss)

    if city is not None:
        query = query.filter(Team.city.like("%" + city + "%"))

    # PAGINATION
    if page is not None:
        query = paginate(query, page, perPage)

    result = team_schema.dump(query, many=True)
    response = jsonify({"data": result, "meta": {"count": count}})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


def toDate(dateString):
    return datetime.datetime.strptime(dateString, "%Y-%m-%d").date()


@app.route("/events")
def get_events():
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)

    name = request.args.get("name", type=str)
    city = request.args.get("city", type=str)
    venue = request.args.get("venue", type=str)
    date = request.args.get("date", type=str)
    league = request.args.get("league", type=str)
    time = request.args.get("time", type=str)

    query = db.session.query(Event)
    count = query.count()

    # FILTER
    if name is not None:
        query = query.filter(Event.name.like("%" + name + "%"))

    if city is not None:
        query = query.filter(Event.city.like("%" + city + "%"))

    if venue is not None:
        query = query.filter(Event.venue.like("%" + venue + "%"))

    if date is not None:
        query = query.filter(Event.local_date.like("%" + date + "%"))

    if league is not None:
        query = query.filter(Event.league == league)

    if time is not None:
        query = query.filter(Event.local_time.contains(time))

    # PAGINATION
    if page is not None:
        query = paginate(query, page, perPage)

    result = event_schema.dump(query, many=True)
    response = jsonify({"data": result, "meta": {"count": count}})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/players/<int:r_id>")
def get_player(r_id):
    query = db.session.query(Player).filter_by(id=r_id)
    try:
        # zero index to get first one
        result = player_schema.dump(query, many=True)[0]

        # get 2 events for the player
        events_query = db.session.query(Event)
        events = event_schema.dump(events_query, many=True)
        player_events = []
        for event in events:
            if (
                event["home_team_id"] == result["team_id"]
                or event["away_team_id"] == result["team_id"]
            ):
                player_events.append(event)

        result["events"] = player_events

        teams_query = db.session.query(Team)

        teams = team_schema.dump(teams_query, many=True)

        # get team info for the player
        for team in teams:
            if team["id"] == result["team_id"]:
                result["team_info"] = team
                break

    except IndexError:
        return return_error(f"Invalid player ID: {r_id}")
    player = query.first()
    # return player as a jsonified?
    response = jsonify({"data": result})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/teams/<int:r_id>")
def get_team(r_id):
    query = db.session.query(Team).filter_by(id=r_id)
    try:
        result = team_schema.dump(query, many=True)[0]

        # get 2 events related to team
        events_query = db.session.query(Event)
        events = event_schema.dump(events_query, many=True)
        team_events = []
        for event in events:
            if (
                event["home_team_id"] == result["id"]
                or event["away_team_id"] == result["id"]
            ):
                team_events.append(event)

        result["events"] = team_events

        # get players related to team
        players_query = db.session.query(Player)

        players = player_schema.dump(players_query, many=True)
        players_info = []

        for player in players:
            if player["team_id"] == result["id"]:
                players_info.append(player)

        result["players_info"] = players_info

    except IndexError:
        return return_error(f"Invalid team ID: {r_id}")
    team = query.first()
    response = jsonify({"data": result})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/events/<int:r_id>")
def get_event(r_id):
    query = db.session.query(Event).filter_by(id=r_id)

    try:
        result = event_schema.dump(query, many=True)[0]

        teams_query = db.session.query(Team)

        teams = team_schema.dump(teams_query, many=True)

        # when this is 2 we know we collected all the info for home and away teams
        teams_found = 0
        # get team info for the event
        for team in teams:
            if team["id"] == result["home_team_id"]:
                result["home_team_info"] = team
                teams_found += 1
            elif team["id"] == result["away_team_id"]:
                result["away_team_info"] = team
                teams_found += 1

            if teams_found == 2:
                break

        # get players related to team
        players_query = db.session.query(Player)
        players = player_schema.dump(players_query, many=True)
        home_players_info = []
        away_players_info = []

        for player in players:
            if player["team_id"] == result["home_team_id"]:
                home_players_info.append(player)
            elif player["team_id"] == result["away_team_id"]:
                away_players_info.append(player)

        result["home_players_info"] = home_players_info
        result["away_players_info"] = away_players_info

    except IndexError:
        return return_error(f"Invalid event ID: {r_id}")
    event = query.first()

    response = jsonify({"data": result})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


"""
Returns a 404 error with the given msg
"""


def return_error(msg):
    resp = Response(json.dumps({"error": msg}), mimetype="application/json")
    resp.error_code = 404
    return resp


"""
Returns a paginated query according the page number and number per page
"""


def paginate(query, page_num, num_per_page):
    if num_per_page is None:
        num_per_page = 20
    return query.paginate(page=page_num, per_page=num_per_page, error_out=False).items


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
