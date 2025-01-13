
import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True



# import os
# from urllib.parse import urlparse, urlunparse

# class Config:
#     SECRET_KEY = os.environ.get('SECRET_KEY')
#     FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT', 5000)
#     SQLALCHEMY_TRACK_MODIFICATIONS = False

#     database_url = os.environ.get('DATABASE_URL', 'sqlite:///dev.db')  
#     parsed_url = urlparse(database_url)
#     if parsed_url.scheme == 'postgres':
#         parsed_url = parsed_url._replace(scheme='postgresql')
#     SQLALCHEMY_DATABASE_URI = urlunparse(parsed_url)

#     SQLALCHEMY_ECHO = True

    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)