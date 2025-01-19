from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import CheckConstraint

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    phone_num = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(50), nullable=True)
    zip = db.Column(db.String(20), nullable=True)
    
    __table_args__ = (
      
    )
    
    is_manager = db.Column(db.Boolean, default=False)
    is_guide = db.Column(db.Boolean, default=False)
    businessname = db.Column(db.String(255), nullable=True)
    insurance_provider_name = db.Column(db.String(255), nullable=True)
    insurance_number = db.Column(db.String(50), nullable=True)

    bookings = db.relationship('Booking', back_populates='client', cascade='all, delete-orphan')
    services = db.relationship('Service', back_populates='guide')
    
    is_manager = db.Column(db.Boolean, default=False)
    is_guide = db.Column(db.Boolean, default=False)
    businessname = db.Column(db.String(255), nullable=True)
    insurance_provider_name = db.Column(db.String(255), nullable=True)
    insurance_number = db.Column(db.String(50), nullable=True)

    bookings = db.relationship('Booking', back_populates='client', cascade='all, delete-orphan')
    services = db.relationship('Service', back_populates='guide')
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'phone_num': self.phone_num,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip': self.zip,
            'is_manager': self.is_manager,
            'is_guide': self.is_guide,
            'businessname': self.businessname,
            'insurance_provider_name': self.insurance_provider_name,
            'insurance_number': self.insurance_number,
            'bookings': [booking.to_dict() for booking in self.bookings],
            'services': [service.to_dict() for service in self.services]
        }
