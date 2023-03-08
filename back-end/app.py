from flask import jsonify, request, Response
from models import app, db, Job, Apartment, City, Tag, city_tag_link
from schema import job_schema, city_schema, apartment_schema, tag_schema, apt_img_schema
from sqlalchemy import or_
from sqlalchemy.sql import text, column, desc
import json

DEFAULT_PAGE_SIZE = 20
TAGNAME_TO_ID = {
    "Beach Town": 1,
    "History": 2,
    "Nightlife": 3,
    "Foodie": 4,
    "Outdoorsy": 5,
    "Shopping": 6,
    "Performing Arts": 7,
    "Museums": 8,
    "Posh": 9,
    "Hipster": 10,
    "Hippie": 11,
    "Charming": 12,
    "College Town": 13,
    "Family Friendly": 14,
    "Ski Town": 15,
    "Architecture": 17,
    "LGBT Scene": 18,
    "Wineries": 19,
    "Diversity": 20,
    "Music": 21,
}


@app.route("/")
def home():
    try:
        db.session.query(column("1")).from_statement(text("SELECT 1")).all()
        return "<h1>GeoJobs API</h1>"
    except Exception as e:
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = "<h1>Something is broken.</h1>"
        return hed + error_text


@app.route("/search/<string:query>")
def search_all(query):
    terms = query.split()
    occurrences = {
        **search_cities(terms),
        **search_apartments(terms),
        **search_jobs(terms),
    }
    objs = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
    cities = [city for city in objs if type(city) == City]
    apts = [apt for apt in objs if type(apt) == Apartment]
    jobs = [job for job in objs if type(job) == Job]
    city_results = city_schema.dump(cities, many=True)
    apt_results = apartment_schema.dump(apts, many=True)
    job_results = job_schema.dump(jobs, many=True)
    return jsonify(
        {"cities": city_results, "apartments": apt_results, "jobs": job_results}
    )


@app.route("/search/<string:model>/<string:query>")
def search_models(model, query):
    model = model.strip().lower()
    terms = query.split()
    result = None
    if model == "city":
        occurrences = search_cities(terms)
        cities = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
        result = city_schema.dump(cities, many=True)
    elif model == "apartment":
        occurrences = search_apartments(terms)
        apartments = sorted(
            occurrences.keys(), key=lambda x: occurrences[x], reverse=True
        )
        result = apartment_schema.dump(apartments, many=True)
    elif model == "job":
        occurrences = search_jobs(terms)
        jobs = sorted(occurrences.keys(), key=lambda x: occurrences[x], reverse=True)
        result = job_schema.dump(jobs, many=True)
    else:
        return_error(f"Invalid model: {model}")
    return jsonify({"data": result})


"""
Returns the cities corresponding to the given terms
"""


def search_cities(terms):
    occurrences = {}
    for term in terms:
        queries = []
        queries.append(City.name.contains(term))
        queries.append(City.state.contains(term))
        queries.append(City.population.contains(term))
        queries.append(City.avg_rating.contains(term))
        queries.append(City.budget.contains(term))
        queries.append(City.safety.contains(term))
        queries.append(City.walkscore_url.contains(term))

        # search tags for strings that match
        tags = Tag.query.with_entities(Tag.id).filter(Tag.name.contains(term))
        tag_ids = [id[0] for id in tags]
        if tag_ids:
            # get cities associated with those tags
            tag_string = f"{tag_ids}".replace("[", "(").replace("]", ")")
            city_ids = db.session.execute(
                f"select city_id from \
                city_tag_link where tag_id in {tag_string}"
            ).all()
            city_ids = [id[0] for id in city_ids]
            queries.append(City.id.in_(city_ids))
        cities = City.query.filter(or_(*queries))
        for city in cities:
            if not city in occurrences:
                occurrences[city] = 1
            else:
                occurrences[city] += 1
    return occurrences


"""
Returns the apartments corresponding to the given terms
"""


def search_apartments(terms):
    occurrences = {}
    for term in terms:
        queries = []
        city_ids = (
            City.query.with_entities(City.id).filter(City.name.contains(term)).all()
        )
        city_ids = [id[0] for id in city_ids]
        queries.append(Apartment.city_id.in_(city_ids))
        queries.append(Apartment.bathrooms.contains(term))
        queries.append(Apartment.bedrooms.contains(term))
        queries.append(Apartment.price.contains(term))
        queries.append(Apartment.address.contains(term))
        queries.append(Apartment.property_type.contains(term))
        queries.append(Apartment.sqft.contains(term))
        queries.append(Apartment.build_year.contains(term))
        apts = Apartment.query.filter(or_(*queries))
        for apt in apts:
            if not apt in occurrences:
                occurrences[apt] = 1
            else:
                occurrences[apt] += 1
    return occurrences


"""
Returns the jobs corresponding to the given terms
"""


def search_jobs(terms):
    occurrences = {}
    for term in terms:
        queries = []
        city_ids = (
            City.query.with_entities(City.id).filter(City.name.contains(term)).all()
        )
        city_ids = [id[0] for id in city_ids]
        queries.append(Job.city_id.in_(city_ids))
        queries.append(Job.company.contains(term))
        queries.append(Job.title.contains(term))
        queries.append(Job.category.contains(term))
        queries.append(Job.url.contains(term))
        queries.append(Job.salary_min.contains(term))
        queries.append(Job.salary_max.contains(term))
        queries.append(Job.latitude.contains(term))
        queries.append(Job.longitude.contains(term))
        queries.append(Job.description.contains(term))
        queries.append(Job.created.contains(term))
        jobs = Job.query.filter(or_(*queries))
        for job in jobs:
            if not job in occurrences:
                occurrences[job] = 1
            else:
                occurrences[job] += 1
    return occurrences


@app.route("/cities")
def get_cities():
    # get args
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    tags = request.args.get("tags")
    state = request.args.get("state")
    population = request.args.get("population")
    rating = request.args.get("rating")
    budget = request.args.get("budget")
    safety = request.args.get("safety")
    sort = request.args.get("sort")
    asc = request.args.get("asc")

    # Query
    query = db.session.query(City)

    # Filter
    if tags is not None:
        test = db.session.query(city_tag_link.c.city_id).filter(
            city_tag_link.c.tag_id == TAGNAME_TO_ID[tags]
        )
        query = query.filter(City.id.in_(test))

    if state is not None:
        query = query.filter(City.state == state)

    if population is not None:
        pop_range = population.split("-")
        try:
            query = query.filter(
                City.population >= pop_range[0], City.population <= pop_range[1]
            )
        except Exception:
            pass

    if rating is not None:
        rating_range = rating.split("-")
        try:
            query = query.filter(
                City.avg_rating >= rating_range[0], City.avg_rating <= rating_range[1]
            )
        except Exception:
            pass

    if budget is not None:
        budget_range = budget.split("-")
        try:
            query = query.filter(
                City.budget >= budget_range[0], City.budget <= budget_range[1]
            )
        except Exception:
            pass

    if safety is not None:
        safety_range = safety.split("-")
        try:
            query = query.filter(
                City.safety >= safety_range[0], City.safety <= safety_range[1]
            )
        except Exception:
            pass

    # Sort
    if sort is not None and getattr(City, sort) is not None:
        if asc is not None:
            query = query.order_by(getattr(City, sort))
        else:
            query = query.order_by(desc(getattr(City, sort)))

    count = query.count()
    if page is not None:
        query = paginate(query, page, perPage)
    result = city_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})


@app.route("/jobs")
def get_jobs():
    # get args
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    query = db.session.query(Job)
    count = query.count()
    city = request.args.get("city")
    category = request.args.get("category")
    salary = request.args.get("salary")
    sort = request.args.get("sort")
    asc = request.args.get("asc")

    # FILTERING
    if city is not None:
        test = db.session.query(City.id).filter(City.name == city)
        query = query.filter(Job.city_id.in_(test))
    if category is not None:
        category.replace("and", "&")
        query = query.filter(Job.category == (category))
    if salary is not None:
        salary_range = salary.split("-")
        try:
            query = query.filter(
                Job.salary_min >= salary_range[0], Job.salary_max <= salary_range[1]
            )
        except Exception:
            pass

    # Sort
    if sort is not None and getattr(Job, sort) is not None:
        if asc is not None:
            query = query.order_by(getattr(Job, sort))
        else:
            query = query.order_by(desc(getattr(Job, sort)))

    if page is not None:
        query = paginate(query, page, perPage)
    result = job_schema.dump(query, many=True)
    return jsonify({"data": result, "meta": {"count": count}})


@app.route("/apartments")
def get_apartments():
    # get args
    page = request.args.get("page", type=int)
    perPage = request.args.get("perPage", type=int)
    city = request.args.get("city")
    propertyType = request.args.get("proptype")
    bedrooms = request.args.get("bedrooms")
    bathrooms = request.args.get("bathrooms")
    price = request.args.get("price")
    sqft = request.args.get("sqft")
    sort = request.args.get("sort")
    asc = request.args.get("asc")

    # query
    query = db.session.query(Apartment)

    # filter
    if city is not None:
        test = db.session.query(City.id).filter(City.name == city)
        query = query.filter(Apartment.city_id.in_(test))

    if propertyType is not None:
        query = query.filter(Apartment.property_type == propertyType)

    if bedrooms is not None:
        bed_range = bedrooms.split("-")
        try:
            query = query.filter(
                Apartment.bedrooms >= bed_range[0], Apartment.bedrooms <= bed_range[1]
            )
        except Exception:
            pass

    if bathrooms is not None:
        bath_range = bathrooms.split("-")
        try:
            query = query.filter(
                Apartment.bathrooms >= bath_range[0],
                Apartment.bathrooms <= bath_range[1],
            )
        except Exception:
            pass

    if sqft is not None:
        sqft_range = sqft.split("-")
        try:
            query = query.filter(
                Apartment.sqft >= sqft_range[0], Apartment.sqft <= sqft_range[1]
            )
        except Exception:
            pass

    if price is not None:
        price_range = price.split("-")
        try:
            query = query.filter(
                Apartment.price >= price_range[0], Apartment.price <= price_range[1]
            )
        except Exception:
            pass

    # Sort
    if sort is not None and getattr(Apartment, sort) is not None:
        if asc is not None:
            query = query.order_by(getattr(Apartment, sort))
        else:
            query = query.order_by(desc(getattr(Apartment, sort)))

    count = query.count()
    # paginate query if it's specified
    if page is not None:
        query = paginate(query, page, perPage)
    else:
        query = query.all()
    result = apartment_schema.dump(query, many=True)

    return jsonify({"data": result, "meta": {"count": count}})


@app.route("/cities/<int:r_id>")
def get_city(r_id):
    query = db.session.query(City).filter_by(id=r_id)
    try:
        result = city_schema.dump(query, many=True)[0]
    except IndexError:
        return return_error(f"Invalid city ID: {r_id}")
    city = query.first()
    city_tags = tag_schema.dump(city.tags, many=True)
    result.update({"tags": city_tags})
    # TODO add multiple apartments
    apts = apartment_schema.dump(city.apartments, many=True)
    # TODO add multiple jobs
    jb = job_schema.dump(city.jobs, many=True)
    nearby_cities = City.query.filter_by(state=city.state)
    result.update({"apartment": apts})
    result.update({"job": jb})
    result.update({"nearby_cities": city_schema.dump(nearby_cities, many=True)})
    return jsonify({"data": result})


@app.route("/jobs/<int:r_id>")
def get_job(r_id):
    job = Job.query.filter_by(id=r_id).first()
    if job == None:
        return return_error(f"Invalid job ID: {r_id}")
    result = job_schema.dump(job)
    city = City.query.filter_by(id=job.city_id).first()
    # get apartments such that monthly rent <= monthly pay
    apts = [apt for apt in city.apartments if apt.price <= (job.salary_min / 12)]
    result.update({"city": job.city_id})
    result.update({"apartments": apartment_schema.dump(apts, many=True)})
    return jsonify({"data": result})


@app.route("/apartments/<string:r_id>")
def get_apartment(r_id):
    apt = Apartment.query.filter_by(id=r_id).first()
    if apt == None:
        return return_error(f"Invalid apartment ID: {r_id}")
    result = apartment_schema.dump(apt)
    apartment_images = apt_img_schema.dump(apt.images, many=True)
    # result.update({"images": apartment_images})
    result.update({"city": get_city_from_address(result["address"])})

    # get jobs such that monthly pay >= monthly rent
    city = City.query.filter_by(id=apt.city_id).first()
    jobs = [job for job in city.jobs if (job.salary_min / 12) >= apt.price]
    result.update({"city": apt.city_id})
    result.update({"jobs": job_schema.dump(jobs, many=True)})
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
        num_per_page = DEFAULT_PAGE_SIZE
    return query.paginate(page=page_num, per_page=num_per_page, error_out=False).items


"""
Returns the city associated with the given address
Note: this assumes that the address is formatted like an apartment address 
      returned from the apartments call
"""


def get_city_from_address(address):
    split_addr = address.split(", ")
    city = split_addr[-2]
    state = split_addr[-1].split(" ")[0]
    if city == "Washington" and state == "DC":
        return "Washington, DC"
    return city


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
