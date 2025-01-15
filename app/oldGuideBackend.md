### Guide_Route
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Guide, db
from app.forms import GuideForm

guide_routes = Blueprint('guides', __name__)

# Sign Up a Guide
@guide_routes.route('/signup', methods=['POST'])
def sign_up():
    form = GuideForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        guide = Guide(
            firstname=form.data['firstname'],
            lastname=form.data['lastname'],
            email=form.data['email'],
            phone_num=form.data['phone_num'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zip=form.data['zip'],
            businessname=form.data['businessname'],
            insurance_provider_name=form.data['insurance_provider_name'],
            insurance_number=form.data['insurance_number'],
            services=form.data['services'],
            username=form.data['username'],
            password=form.data['password']
        )
        db.session.add(guide)
        db.session.commit()
        return jsonify(guide.to_dict()), 201
    return jsonify(form.errors), 400

# Update a Guide
@guide_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_guide(id):
    form = GuideForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    guide = Guide.query.get(id)
    if not guide:
        return jsonify({"message": "Guide not found"}), 404

    if form.validate_on_submit():
        guide.firstname = form.data['firstname']
        guide.lastname = form.data['lastname']
        guide.email = form.data['email']
        guide.phone_num = form.data['phone_num']
        guide.address = form.data['address']
        guide.city = form.data['city']
        guide.state = form.data['state']
        guide.zip = form.data['zip']
        guide.businessname = form.data['businessname']
        guide.insurance_provider_name = form.data['insurance_provider_name']
        guide.insurance_number = form.data['insurance_number']
        guide.services = form.data['services']
        guide.username = form.data['username']
        guide.password = form.data['password']

        db.session.commit()
        return jsonify(guide.to_dict()), 200
    return jsonify(form.errors), 400

# Delete a Guide
@guide_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_guide(id):
    guide = Guide.query.get(id)
    if not guide:
        return jsonify({"message": "Guide not found"}), 404

    db.session.delete(guide)
    db.session.commit()
    return jsonify({"message": "Guide successfully deleted"}), 200

# Get Guide Details
@guide_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_guide(id):
    guide = Guide.query.get(id)
    if not guide:
        return jsonify({"message": "Guide not found"}), 404
    return jsonify(guide.to_dict()), 200

# Get All Guides
@guide_routes.route('/', methods=['GET'])
@login_required
def get_guides():
    guides = Guide.query.all()
    return jsonify([guide.to_dict() for guide in guides]), 200


### Guide Form
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Guide

def guide_exists(form, field):
    email = field.data
    guide = Guide.query.filter(Guide.email == email).first()
    if guide:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    username = field.data
    guide = Guide.query.filter(Guide.username == username).first()
    if guide:
        raise ValidationError('Username is already in use.')

class GuideForm(FlaskForm):
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email(), guide_exists])
    phone_num = StringField('phone_num')
    address = StringField('address')
    city = StringField('city')
    state = StringField('state')
    zip = StringField('zip')
    businessname = StringField('businessname')
    insurance_provider_name = StringField('insurance_provider_name')
    insurance_number = StringField('insurance_number')
    services = StringField('services')
    username = StringField('username', validators=[DataRequired(), username_exists])
    password = PasswordField('password', validators=[DataRequired()])

### Guide login Form
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email

class GuideLoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email()])
    password = PasswordField('password', validators=[DataRequired()])


### Guide Model
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


### Guide Seeds
from app.models import db, Guide

def seed_guides():
    guides = [
        Guide(
            firstname='John',
            lastname='Doe',
            email='john.doe@gmail.com',
            phone_num='123-456-7890',
            address='123 Main St',
            city='Cheyenne',
            state='WY',
            zip='82001',
            businessname="John's Guide Service",
            insurance_provider_name='Insurance Co',
            insurance_number='123456789',
            username='JohnDoe',
            password='password'
        ),
        Guide(
            firstname='Jane',
            lastname='Smith',
            email='jane.smith@gmail.com',
            phone_num='987-654-3210',
            address='456 Another St',
            city='Santa Fe',
            state='NM',
            zip='87501',
            businessname="Jane's Guide Service",
            insurance_provider_name='Insurance Co',
            insurance_number='987654321',
            username='JaneSmith',
            password='password'
        ),
        Guide(
            firstname='Mike',
            lastname='Johnson',
            email='mike.johnson@gmail.com',
            phone_num='555-555-5555',
            address='789 Ocean Dr',
            city='Key West',
            state='FL',
            zip='33040',
            businessname="Mike's Fishing Adventures",
            insurance_provider_name='Insurance Co',
            insurance_number='555555555',
            username='MikeJohnson',
            password='password'
        ),
        Guide(
            firstname='Sarah',
            lastname='Williams',
            email='sarah.williams@gmail.com',
            phone_num='444-444-4444',
            address='101 Mountain Rd',
            city='Anchorage',
            state='AK',
            zip='99501',
            businessname="Sarah's Wilderness Expeditions",
            insurance_provider_name='Insurance Co',
            insurance_number='444444444',
            username='SarahWilliams',
            password='password'
        ),
        Guide(
            firstname='Tom',
            lastname='Brown',
            email='tom.brown@gmail.com',
            phone_num='333-333-3333',
            address='202 River St',
            city='Juneau',
            state='AK',
            zip='99801',
            businessname="Tom's Fishing Charters",
            insurance_provider_name='Insurance Co',
            insurance_number='333333333',
            username='TomBrown',
            password='password'
        ),
        Guide(
            firstname='Emily',
            lastname='Davis',
            email='emily.davis@gmail.com',
            phone_num='222-222-2222',
            address='303 Rock Climb Ln',
            city='Los Angeles',
            state='CA',
            zip='90001',
            businessname="Emily's Climbing Adventures",
            insurance_provider_name='Insurance Co',
            insurance_number='222222222',
            username='EmilyDavis',
            password='password'
        ),
        Guide(
            firstname='David',
            lastname='Miller',
            email='david.miller@gmail.com',
            phone_num='111-111-1111',
            address='404 Canyon Rd',
            city='Springdale',
            state='UT',
            zip='84767',
            businessname="David's Climbing Expeditions",
            insurance_provider_name='Insurance Co',
            insurance_number='111111111',
            username='DavidMiller',
            password='password'
        ),
        Guide(
            firstname='Laura',
            lastname='Wilson',
            email='laura.wilson@gmail.com',
            phone_num='666-666-6666',
            address='505 Glacier Ave',
            city='Kalispell',
            state='MT',
            zip='59901',
            businessname="Laura's Backpacking Tours",
            insurance_provider_name='Insurance Co',
            insurance_number='666666666',
            username='LauraWilson',
            password='password'
        ),
        Guide(
            firstname='Chris',
            lastname='Moore',
            email='chris.moore@gmail.com',
            phone_num='777-777-7777',
            address='606 Rapids Rd',
            city='Denver',
            state='CO',
            zip='80201',
            businessname="Chris's Rafting Adventures",
            insurance_provider_name='Insurance Co',
            insurance_number='777777777',
            username='ChrisMoore',
            password='password'
        ),
        Guide(
            firstname='Anna',
            lastname='Taylor',
            email='anna.taylor@gmail.com',
            phone_num='888-888-8888',
            address='707 Kayak St',
            city='Boise',
            state='ID',
            zip='83701',
            businessname="Anna's Kayaking Tours",
            insurance_provider_name='Insurance Co',
            insurance_number='888888888',
            username='AnnaTaylor',
            password='password'
        ),
        Guide(
            firstname='James',
            lastname='Anderson',
            email='james.anderson@gmail.com',
            phone_num='999-999-9999',
            address='808 Spear St',
            city='Cabo San Lucas',
            state='BCS',
            zip='23450',
            businessname="James's Spear Fishing",
            insurance_provider_name='Insurance Co',
            insurance_number='999999999',
            username='JamesAnderson',
            password='password'
        ),
        Guide(
            firstname='Olivia',
            lastname='Martinez',
            email='olivia.martinez@gmail.com',
            phone_num='101-101-1010',
            address='909 Fly Fish Ln',
            city='Queenstown',
            state='OTG',
            zip='9300',
            businessname="Olivia's Fly Fishing",
            insurance_provider_name='Insurance Co',
            insurance_number='101010101',
            username='OliviaMartinez',
            password='password'
        ),
        Guide(
            firstname='Ethan',
            lastname='Thomas',
            email='ethan.thomas@gmail.com',
            phone_num='202-202-2020',
            address='1010 River Rd',
            city='Bozeman',
            state='MT',
            zip='59715',
            businessname="Ethan's Fly Fishing",
            insurance_provider_name='Insurance Co',
            insurance_number='202020202',
            username='EthanThomas',
            password='password'
        ),
        Guide(
            firstname='Sophia',
            lastname='White',
            email='sophia.white@gmail.com',
            phone_num='303-303-3030',
            address='1111 Ski Ln',
            city='Whitefish',
            state='MT',
            zip='59937',
            businessname="Sophia's Ski Adventures",
            insurance_provider_name='Insurance Co',
            insurance_number='303030303',
            username='SophiaWhite',
            password='password'
        ),
        Guide(
            firstname='Tenzing',
            lastname='Norgay',
            email='tenzing.norgay@everestguides.com',
            phone_num='977-1-5555555',
            address='123 Everest Base Camp',
            city='Kathmandu',
            state='Bagmati',
            zip='44600',
            businessname="Everest Guided Trips",
            insurance_provider_name='Himalayan Insurance',
            insurance_number='EVEREST123',
            username='TenzingNorgay',
            password='everest2023'
        ),
        Guide(
            firstname='Demo',
            lastname='Guide',
            email='demo-guide@aa.io',
            phone_num='555-555-5555',
            address='789 Demo St',
            city='Demoville',
            state='CA',
            zip='12345',
            businessname="Demo's Guide Service",
            insurance_provider_name='Demo Insurance',
            insurance_number='000000000',
            username='DemoGuide',
            password='password'
        )
    ]

    for guide in guides:
        db.session.add(guide)

    db.session.commit()

def undo_guides():
    db.session.execute("DELETE FROM guides")
    db.session.commit()