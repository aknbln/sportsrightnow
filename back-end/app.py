from flask import jsonify, request, Response
from models import app, db, Player, Team, Event
from schema import player_schema, team_schema, event_schema
from sqlalchemy.sql import text, column, desc
import json

@app.route("/")
def home():
    try:
        # db.session.query(column("1")).from_statement(text("SELECT 1")).all()
        # populate_db()
        return "We made it"
    except Exception as e:
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = "<h1>Something is broken.</h1>"
        return hed + error_text


@app.route("/players")
def get_players():
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    query = db.session.query(Player)
    print(f'query before is : {query}')
    count = query.count()
    if page is not None:
        query = paginate(query, page, perPage)
    print(f'query after is : {query}')
    result = player_schema.dump(query, many = True)

    print(f'result is : {result}')
    return jsonify({"data": result, "meta": {"count": count}})
    # way to use to_dict in case above ever breaks
    # page = request.args.get('page')
    # perPage = request.args.get('perPage')
    # maxId = int(perPage) * int(page)
    # minId = maxId - int(perPage)
    # players = Player.query.filter(Player.id < maxId).filter(Player.id >= minId).order_by(Player.id).all()
    # return jsonify([player.to_dict() for player in players])


@app.route("/teams")
def get_teams():
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    query = db.session.query(Team)
    count = query.count()
    if page is not None:
        query = paginate(query, page, perPage)
    result = team_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})


@app.route("/events")
def get_events():
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    query = db.session.query(Event)
    count = query.count()
    if page is not None:
        query = paginate(query, page, perPage)
    result = event_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})


@app.route("/players/<int:r_id>")
def get_player(r_id):
    query = db.session.query(Player).filter_by(id=r_id)
    try:
        # zero index to get first one
        result = player_schema.dump(query, many=True)[0]

        #get 2 events for the player
        events_query = db.session.query(Event)
        events = event_schema.dump(events_query, many = True)
        num_of_events = 2
        player_events = []
        for event in events:
            
            if (event['home_team_id'] == result['team_id'] or 
            event['away_team_id'] == result['team_id']):
                player_events.append(event)
                num_of_events -= 1

            if num_of_events == 0:
                break
        
        result['events'] = player_events

        teams_query = db.session.query(Team)

        teams = team_schema.dump(teams_query, many = True)

        #get team info for the player
        for team in teams:
            if team['id'] == result['team_id']:
                result['team_info'] = team
                break

    except IndexError:
        return return_error(f"Invalid player ID: {r_id}")
    player = query.first()
    # return player as a jsonified?
    return jsonify({"data": result})


@app.route("/teams/<int:r_id>")
def get_team(r_id):
    query = db.session.query(Team).filter_by(id=r_id)
    try:
        result = team_schema.dump(query, many=True)[0]

        
        #get 2 events related to team
        events_query = db.session.query(Event)
        events = event_schema.dump(events_query, many = True)
        num_of_events = 2
        team_events = []
        for event in events:
            
            if (event['home_team_id'] == result['id'] or 
            event['away_team_id'] == result['id']):
                team_events.append(event)
                num_of_events -= 1

            if num_of_events == 0:
                break
        
        result['events'] = team_events

        #get players related to team
        players_query = db.session.query(Player)
        
        players = player_schema.dump(players_query, many = True)
        players_info = []

        num_of_players = 2
        for player in players:
            if player['team_id'] == result['id']:
                players_info.append(player)
                num_of_players -= 1
            
            if num_of_players == 0:
                break
    
        result['players_info'] = players_info

    except IndexError:
        return return_error(f"Invalid team ID: {r_id}")
    team = query.first()
    # should we add home stadium to the event model so we can connect them here?
    # team_events = event_schema.dump(team., many=True)
    # what about team roster?
    return jsonify({"data": result})


@app.route("/events/<int:r_id>")
def get_event(r_id):
    query = db.session.query(Event).filter_by(id=r_id)


    try:
        result = event_schema.dump(query, many=True)[0]


        teams_query = db.session.query(Team)

        teams = team_schema.dump(teams_query, many = True)

        #when this is 2 we know we collected all the info for home and away teams
        teams_found = 0
        #get team info for the event
        for team in teams:
            if team['id'] == result['home_team_id']:
                result['home_team_info'] = team
                teams_found += 1
            elif team['id'] == result['away_team_id']:
                result['away_team_info'] = team
                teams_found += 1
            
            if teams_found == 2:
                break

        #get players related to team
        
        players_query = db.session.query(Player)
        players = player_schema.dump(players_query, many = True)
        home_players_info = []
        away_players_info = []

        for player in players:
            if player['team_id'] == result['home_team_id']:
                home_players_info.append(player)
            elif player['team_id'] == result['away_team_id']:
                away_players_info.append(player)

        result['home_players_info'] = home_players_info
        result['away_players_info'] = away_players_info

    except IndexError:
        return return_error(f"Invalid event ID: {r_id}")
    event = query.first()
    return jsonify({"data": result})


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
