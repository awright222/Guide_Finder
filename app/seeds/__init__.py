from flask.cli import AppGroup
from .users import seed_users, undo_users
from .services import seed_services, undo_services
from .bookings import seed_bookings, undo_bookings
from .reviews import seed_reviews, undo_reviews
from .messages import seed_messages, undo_messages
from .favorites import seed_favorites, undo_favorites

from app.models.db import db, environment, SCHEMA


seed_commands = AppGroup('seed')


@seed_commands.command('all')
def seed():
    if environment == 'production':

        undo_users()
        undo_services() 
        undo_bookings()
        undo_reviews()
        undo_messages()
        undo_favorites()
    seed_users()
    seed_services() 
    seed_bookings()
    seed_reviews()
    seed_messages()
    seed_favorites()
    


@seed_commands.command('undo')
def undo():
    undo_bookings()
    undo_services()
    undo_users()
    undo_reviews()
    undo_messages()
    undo_favorites()