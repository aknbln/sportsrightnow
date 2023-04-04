from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.debug = True
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://admin:sportsnow@awseb-e-xhfngawiag-stack-awsebrdsdatabase-s4mrqsdheeme.cs5wmldwpa7o.us-west-2.rds.amazonaws.com:3306/ebdb"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydb.db' #local db
db = SQLAlchemy(app)


class Player(db.Model):
    __tablename__ = "players"
    id = db.Column(db.String(250), primary_key=True)
    name = db.Column(db.String(250))
    team = db.Column(db.String(250))
    team_id = db.Column(db.String(250))
    position = db.Column(db.String(250))
    college = db.Column(db.String(250))
    weight = db.Column(db.String(250))
    height = db.Column(db.String(250))
    birthdate = db.Column(db.String(250))
    headshot = db.Column(db.String(250))
    jersey = db.Column(db.String(250))
    league = db.Column(db.String(250))
    espnLink = db.Column(db.String(250))
    

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "team": self.team,
            "team_id": self.team_id,
            "position": self.position,
            "college": self.college,
            "weight": self.weight,
            "height": self.height,
            "birthdate": self.birthdate,
            "headshot": self.headshot,
            "jersey": self.jersey,
            "league": self.league,
            "espnLink": self.espnLink
        }


class Team(db.Model):
    __tablename__ = "teams"
    id = db.Column(db.String(250), primary_key=True)
    name = db.Column(db.String(250))
    division = db.Column(db.String(250))
    conference = db.Column(db.String(250))
    rank = db.Column(db.Integer)
    totalWins = db.Column(db.Integer)
    totalLosses = db.Column(db.Integer)
    logo = db.Column(db.String(250))
    city = db.Column(db.String(250))
    league = db.Column(db.String(250))
    # players = db.relationship('Player', backref = 'team')
    espnLink = db.Column(db.String(250))
    stadium_name = db.Column(db.String(250))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "division": self.division,
            "conference": self.conference,
            "rank": self.rank,
            "totalWins": self.totalWins,
            "totalLosses": self.totalLosses,
            "logo": self.logo,
            "city": self.city,
            "league": self.league,
            "espnLink": self.espnLink,
            "stadium_name": self.stadium_name,
        }


class Event(db.Model):
    __tablename__ = "events"
    id = db.Column(db.String(250), primary_key=True)
    name = db.Column(db.String(250))
    url = db.Column(db.String(250))
    league = db.Column(db.String(250))
    local_date = db.Column(db.String(250))
    local_time = db.Column(db.String(250))
    seatmap = db.Column(db.String(250))
    city = db.Column(db.String(250))
    venue = db.Column(db.String(250))
    home_team = db.Column(db.String(250))
    away_team = db.Column(db.String(250))
    home_team_image = db.Column(db.String(250))
    home_team_id = db.Column(db.String(250))
    away_team_id = db.Column(db.String(250))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "league": self.league,
            "local_date": self.local_date,
            "local_time": self.local_time,
            "seatmap": self.seatmap,
            "city": self.city,
            "venue": self.venue,
            "home_team": self.home_team,
            "away_team": self.away_team,
            "home_team_image": self.home_team_image,
            "home_team_id" : self.homeTeamId,
            "away_team_id" : self.awayTeamId,
        }
