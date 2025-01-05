from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import jwt
from datetime import datetime, timedelta

class Guide(db.Model, UserMixin):
    __tablename__ = 'guides'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_num = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(50), nullable=True)
    zip = db.Column(db.String(20), nullable=True)
    businessname = db.Column(db.String(255), nullable=True)
    insurance_provider_name = db.Column(db.String(255), nullable=True)
    insurance_number = db.Column(db.String(50), nullable=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    services = db.relationship('Service', back_populates='guide')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)

    def generate_auth_token(self, expires_in=600):
        return jwt.encode(
            {'id': self.id, 'exp': datetime.utcnow() + timedelta(seconds=expires_in)},
            'your-secret-key', algorithm='HS256'
        )

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'phone_num': self.phone_num,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip': self.zip,
            'businessname': self.businessname,
            'insurance_provider_name': self.insurance_provider_name,
            'insurance_number': self.insurance_number,
            'services': [service.to_dict() for service in self.services],
            'username': self.username
        }