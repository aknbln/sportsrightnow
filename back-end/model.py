from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.debug=True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:GeojobsTeam!@db.geojobs.me/geojobs'
db = SQLAlchemy(app)

city_tag_link = db.Table(
    'city_tag_link', 
    db.Column('city_id', db.Integer, db.ForeignKey('city.id'), primary_key = True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key = True)
)

# class Player(db.Model) :

# class Team(db.Model) :

# class Event(db.Model) :

class City(db.Model) :
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(20))
    state = db.Column(db.String(30))
    population = db.Column(db.Integer)
    avg_rating = db.Column(db.Float)
    budget = db.Column(db.Integer)
    safety = db.Column(db.Integer)
    walkscore_url = db.Column(db.String(60))
    police_twitter = db.Column(db.String(20)) # stores the twitter handle
    img_url = db.Column(db.String(200)) # subject to change
    tags = db.relationship('Tag', secondary = city_tag_link, backref = 'cities')
    apartments = db.relationship('Apartment', backref = 'city')
    jobs = db.relationship('Job', backref = 'city')

class Tag(db.Model) :
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50))

class Apartment(db.Model) :
    id = db.Column(db.String(65), primary_key = True)
    city_id = db.Column(db.Integer, db.ForeignKey('city.id'))
    bathrooms = db.Column(db.Integer)
    bedrooms = db.Column(db.Integer)
    price = db.Column(db.Integer)
    address = db.Column(db.String(70))
    property_type = db.Column(db.String(20))
    sqft = db.Column(db.Integer)
    build_year = db.Column(db.Integer)
    images = db.relationship('ApartmentImage', backref = 'apartment')

class ApartmentImage(db.Model) :
    id = db.Column(db.Integer, primary_key = True)
    apt_id = db.Column(db.String(65), db.ForeignKey('apartment.id'))
    img_url = db.Column(db.String(200)) # subject to change

class Job(db.Model) : 
    id = db.Column(db.BigInteger, primary_key = True)
    city_id = db.Column(db.Integer, db.ForeignKey('city.id'))
    company = db.Column(db.String(40))
    title = db.Column(db.String(70))
    category = db.Column(db.String(30))
    url = db.Column(db.String(150))
    salary_min = db.Column(db.Integer)
    salary_max = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    description = db.Column(db.String(550))
    created = db.Column(db.DateTime)
    img_url = db.Column(db.String(200)) # subject to change
