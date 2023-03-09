from flask_marshmallow import Marshmallow
from models import Player, Team, Event
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields

ma = Marshmallow()

class PlayerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Player

class TeamSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Team

# class TagSchema(SQLAlchemyAutoSchema):
#     class Meta:
#         model = Tag

# class AptImageSchema(SQLAlchemyAutoSchema):
#     class Meta:
#         model = ApartmentImage

# class EventImageSchema(SQLAlchemyAutoSchema):
#     class Meta:
#         model = EventImage

class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event
    # images = fields.RelatedList(fields.Nested(EventImageSchema))

# job_schema = JobSchema()
# apartment_schema = ApartmentSchema()
# city_schema = CitySchema()
# tag_schema = TagSchema()
# apt_img_schema = AptImageSchema()

# event_img_schema = EventImageSchema()
player_schema = PlayerSchema()
team_schema = TeamSchema()
event_schema = EventSchema()
