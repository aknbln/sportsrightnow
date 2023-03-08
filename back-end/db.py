
import json
# from models import app, db, City, Tag, Apartment, ApartmentImage, Job
from models import app, db, Player, Team, Event

def populate_db():
    # populate_cities()
    # populate_apartments()
    # populate_apartment_images()
    # populate_jobs()

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
                        # "height" : player["height"] if "height" in player else None,
                        "weight" : int(player["weight-pounds"]) if "weight-pounds" in player else player["Weight"] if "Weight" in player else player["weight"] if "weight" in player else None,
                        "birthdate" : player["birthDay"] if "birthDay" in player else player["BirthDate"] if "BirthDate" in player else player["birth_date"] if "birth_date" in player else None,
                        "headshot" : player["logo"] if "logo" in player else player["photo_url"] if "photo_url" in player else player["headshot"] if "headshot" in player else None,
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
                db_row = {
                "id" : event["name"],
                "name" : event["name"],
                "url" : event["url"],
                "local_date" : event["dates"]["start"]["localDate"],
                "local_time" : event["dates"]["start"]["localTime"],
                "logo" : event["seatmap"]["staticUrl"],
                "city" : event["_embedded"]["city"]["name"],
                "venue" : event["_embedded"]["name"]
                }




            db.session.add(Event(**db_row))   
        db.session.commit()


def populate_cities():
    twitter = open("data/policetwitter_data.json")
    twitter_data = json.load(twitter)
    twitter.close()
    with open("data/roadgoat_data.json") as jsn:
        roadgoat_data = json.load(jsn)
        for city in roadgoat_data:
            state_id = city["data"]["relationships"]["state"]["data"]["id"]
            state = [
                item["attributes"]["short_name"]
                for item in city["included"]
                if item["id"] == state_id
            ][0]
            photo = None
            if "photos" in city["data"]["relationships"]:
                photo_id = city["data"]["relationships"]["photos"]["data"][0]["id"]
                photo = [
                    item["attributes"]["image"]["full"]
                    for item in city["included"]
                    if item["id"] == photo_id
                ][0]
            known_for_ids = [
                item["id"]
                for item in city["data"]["relationships"]["known_for"]["data"]
            ]
            twitter_handle = [
                twitter["twitter"]
                for twitter in twitter_data
                if twitter["id"] == int(city["data"]["id"])
            ][0]
            db_row = {
                "id": city["data"]["id"],
                "name": city["data"]["attributes"]["short_name"],
                "state": state,
                "population": city["data"]["attributes"]["population"],
                "avg_rating": city["data"]["attributes"]["average_rating"],
                "budget": list(city["data"]["attributes"]["budget"].items())[0][1][
                    "value"
                ],
                "safety": list(city["data"]["attributes"]["safety"].items())[0][1][
                    "value"
                ],
                "walkscore_url": city["data"]["attributes"]["walk_score_url"],
                "police_twitter": twitter_handle,
                "img_url": photo,
                "tags": [],
            }
            # loop through tags and add them
            for tag_id in known_for_ids:
                tag = Tag.query.filter_by(id=tag_id).first()
                # if tag does not exist, create it
                if tag == None:
                    tag_name = [
                        item["attributes"]["name"]
                        for item in city["included"]
                        if item["id"] == tag_id and item["type"] == "known_for"
                    ][0]
                    tag = Tag(id=int(tag_id), name=tag_name)
                    db.session.add(tag)
                # add the tag
                db_row["tags"].append(tag)

            db.session.add(City(**db_row))
        db.session.commit()


def populate_apartments():
    with open("data/realitymole_data.json") as jsn:
        realitymole_data = json.load(jsn)
        apts = [apt for city in realitymole_data for apt in city]
        for apt in apts:
            if apt["city"] == "Washington":
                apt["city"] = "Washington, D.C."
            city = City.query.filter_by(name=apt["city"]).first().id
            db_row = {
                "id": apt["id"],
                "city_id": city,
                "bathrooms": apt["bathrooms"] if "bathrooms" in apt else None,
                "bedrooms": apt["bedrooms"] if "bedrooms" in apt else None,
                "price": apt["price"],
                "address": apt["formattedAddress"],
                "property_type": apt["propertyType"],
                "sqft": apt["squareFootage"] if "squareFootage" in apt else None,
                "build_year": apt["yearBuilt"] if "yearBuilt" in apt else None,
                "images": [],
            }
            db.session.add(Apartment(**db_row))
        db.session.commit()


def populate_apartment_images():
    with open("data/apartmentimage_data.json") as jsn:
        apt_imgs = json.load(jsn)
        for apt in apt_imgs:
            current_apartment = Apartment.query.filter_by(id=apt["id"]).first()
            for img in apt["images"]:
                apartment_image = ApartmentImage(apt_id=apt["id"], img_url=img)
                current_apartment.images.append(apartment_image)
                db.session.add(apartment_image)
        db.session.commit()


def populate_jobs():
    with open("data/adzuna_data.json") as jsn:
        jobs = json.load(jsn)
        logos_file = open("data/companylogo_data.json")
        logos = json.load(logos_file)
        logos_file.close()
        cities_file = open("data/cities_list.json")
        cities = json.load(cities_file)
        cities_file.close()
        for idx in range(0, len(cities)):
            city_jobs = jobs[idx]
            city, state = cities[idx].split(':')
            city_obj = City.query.filter_by(name=city, state=state).first()
            for job in city_jobs['results']:
                logo_url = [
                    company["logo"] for company in logos if company["id"] == job["id"]
                ]
                db_row = {
                    "id": job["id"],
                    "city_id": city_obj.id,
                    "company": job["company"]["display_name"],
                    "title": job["title"],
                    "category": job["category"]["label"],
                    "url": job["redirect_url"],
                    "salary_min": job["salary_min"],
                    "salary_max": job["salary_max"] if "salary_max" in job else None,
                    "latitude": job["latitude"] if "latitude" in job else None,
                    "longitude": job["longitude"] if "longitude" in job else None,
                    "description": job["description"],
                    "created": job["created"],
                    "img_url": logo_url[0] if logo_url else None,
                }
                db.session.add(Job(**db_row))
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()
