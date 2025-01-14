from flask.cli import AppGroup
from .users import seed_users, undo_users
from .services import seed_services, undo_services
from .guides import seed_guides, undo_guides
from .bookings import seed_bookings, undo_bookings
from .reviews import seed_reviews, undo_reviews
from .messages import seed_messages, undo_messages
from .favorites import seed_favorites, undo_favorites

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        undo_users()
        undo_services()
        undo_guides()
        undo_bookings()
        undo_reviews()
        undo_messages()
        undo_favorites()
    seed_users()
    seed_services()
    seed_guides()
    seed_bookings()
    seed_reviews()
    seed_messages()
    seed_favorites()
    

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_bookings()
    undo_services()
    undo_guides()
    undo_users()
    undo_reviews()
    undo_messages()
    undo_favorites()
    # Add other undo functions here


# from flask.cli import AppGroup
# from .users import seed_users, undo_users
# from .services import seed_services, undo_services
# from .guides import seed_guides, undo_guides
# from .bookings import seed_bookings, undo_bookings
# from .reviews import seed_reviews, undo_reviews
# from .messages import seed_messages, undo_messages
# from .favorites import seed_favorites, undo_favorites

# from app.models.db import db, environment, SCHEMA

# # Creates a seed group to hold our commands
# # So we can type `flask seed --help`
# seed_commands = AppGroup('seed')

# # Creates the `flask seed all` command
# @seed_commands.command('all')
# def seed():
#     if environment == 'production':
#         # Before seeding in production, you want to run the seed undo 
#         # command, which will truncate all tables prefixed with 
#         # the schema name (see comment in users.py undo_users function).
#         undo_users()
#         undo_services()
#         undo_guides()
#         undo_bookings()
#         undo_reviews()
#         undo_messages()
#         undo_favorites()
#     seed_users()
#     seed_services()
#     seed_guides()
#     seed_bookings()
#     seed_reviews()
#     seed_messages()
#     seed_favorites()
    

# # Creates the `flask seed undo` command
# @seed_commands.command('undo')
# def undo():
#     undo_bookings()
#     undo_services()
#     undo_guides()
#     undo_users()
#     undo_reviews()
#     undo_messages()
#     undo_favorites()
#     # Add other undo functions here