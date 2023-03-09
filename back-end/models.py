from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.debug=True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydb.db' #local db
#sports-real database (connects to mySQLworkbench and can be tested with test function)
# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://admin:sportsnow@sports-real.c2djuzvxaqfd.us-east-2.rds.amazonaws.com:3306"

# sports db, may be used later 
# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://mysqlsports:mysqlsports@sports.c2djuzvxaqfd.us-east-2.rds.amazonaws.com:3306"
db = SQLAlchemy(app)

class Player(db.Model) :
    __tablename__ = 'players'
    id = db.Column(db.String(50), primary_key = True)
    name = db.Column(db.String(50))
    # team_id = db.Column(db.String(50), db.ForeignKey('team.id'))
    position = db.Column(db.String(50))
    college = db.Column(db.String(50))
    weight = db.Column(db.Integer)
    height = db.Column(db.Integer)
    birthdate = db.Column(db.String(50))
    headshot = db.Column(db.String(50))
    jersey = db.Column(db.Integer)
    league = db.Column(db.String(50))
    # frontend can possibly use to make parsing through data easier
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "team_id": self.team_id,
            "position": self.position,
            "college" : self.college,
            "weight" : self.weight,
            "height" : self.height,
            "birthdate" : self.birthdate,
            "headshot" : self.headshot,
            "jersey" : self.jersey,
            "league" : self.league
        }

class Team(db.Model) :
    __tablename__ = 'teams'
    id = db.Column(db.String(50), primary_key = True)
    name = db.Column(db.String(50))
    division = db.Column(db.String(50))
    conference = db.Column(db.String(50))
    rank = db.Column(db.Integer)
    totalWins = db.Column(db.Integer)
    totalLosses = db.Column(db.Integer)
    logo = db.Column(db.String(50))
    city = db.Column(db.String(50))
    league = db.Column(db.String(50))
    # players = db.relationship('Player', backref = 'team')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "division": self.division,
            "conference" : self.conference,
            "rank" : self.rank,
            "totalWins" : self.totalWins,
            "totalLosses" : self.totalLosses,
            "logo" : self.logo,
            "city" : self.city,
            "league" : self.league
        }

class Event(db.Model) :
    __tablename__ = 'events'
    id = db.Column(db.String(50), primary_key = True)
    name = db.Column(db.String(50))
    url = db.Column(db.String(50))
    local_date = db.Column(db.String(50))
    local_time = db.Column(db.String(50))
    logo = db.Column(db.String(50))
    city = db.Column(db.String(50))
    venue = db.Column(db.String(50))
    home_team = db.Column(db.String(50))
    away_team = db.Column(db.String(50))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "local_date": self.local_date,
            "local_time" : self.local_time,
            "logo" : self.logo,
            "city" : self.city,
            "venue" : self.venue,
            "home_team" : self.home_team,
            "away_team" : self.away_team
        }
