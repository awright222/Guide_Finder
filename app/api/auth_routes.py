from flask import Blueprint, request, jsonify, make_response
from app.models import User, Guide, db
from app.forms import LoginForm, SignUpForm
from app.forms.guide_login_form import GuideLoginForm
from app.forms.guide_form import GuideForm
from flask_login import login_user
from werkzeug.security import generate_password_hash
from flask_wtf.csrf import generate_csrf
import logging

auth_routes = Blueprint('auth', __name__)

# Automatically inject CSRF token into responses
@auth_routes.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True,       
        samesite='Lax',    
        httponly=False   
    )
    return response

# User Login Route (CSRF auto-handled)
@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm(request.form)

    logging.info('Login attempt made.')

    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        if user and user.check_password(form.data['password']):
            login_user(user)
            return jsonify(user.to_dict())
        return jsonify({'errors': ['Invalid credentials']}), 401
    return jsonify({'errors': form.errors}), 400

# User Signup Route (CSRF auto-handled)
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm(request.form)

    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=generate_password_hash(form.data['password']),
            fname=form.data['fname'],
            lname=form.data['lname'],
            phone_num=form.data['phone_num'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zip=form.data['zip'],
            staff=form.data.get('staff', False),
            position=form.data.get('position', None)
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify(user.to_dict())
    return jsonify({'errors': form.errors}), 401

# Guide Login Route (CSRF auto-handled)
@auth_routes.route('/guide-login', methods=['POST'])
def guide_login():
    form = GuideLoginForm(request.form)

    if form.validate_on_submit():
        guide = Guide.query.filter(Guide.email == form.data['email']).first()
        if guide and guide.check_password(form.data['password']):
            login_user(guide)
            return jsonify(guide.to_dict())
        return jsonify({'errors': ['Invalid credentials']}), 401
    return jsonify({'errors': form.errors}), 400

# Guide Signup Route (CSRF auto-handled)
@auth_routes.route('/guide-signup', methods=['POST'])
def guide_sign_up():
    form = GuideForm(request.form)

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
            password=generate_password_hash(form.data['password'])
        )
        db.session.add(guide)
        db.session.commit()
        login_user(guide)
        return jsonify(guide.to_dict())
    return jsonify({'errors': form.errors}), 400

# Unauthorized route 
@auth_routes.route('/unauthorized')
def unauthorized():
    return jsonify({'errors': ['Unauthorized']}), 401

# Global Error Handlers 
@auth_routes.app_errorhandler(400)
def bad_request_error(e):
    return jsonify({'errors': ['Bad Request']}), 400

@auth_routes.app_errorhandler(500)
def server_error(e):
    return jsonify({'errors': ['Internal Server Error']}), 500
