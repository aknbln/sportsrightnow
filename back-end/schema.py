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


class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event

player_schema = PlayerSchema()
team_schema = TeamSchema()
event_schema = EventSchema()
