from flask import Blueprint, request, jsonify
from app.models import User, Guide, db
from app.forms import LoginForm, SignUpForm
from app.forms.guide_login_form import GuideLoginForm
from app.forms.guide_form import GuideForm
from flask_login import login_user, current_user
from werkzeug.security import generate_password_hash
from flask_wtf.csrf import generate_csrf
import logging

auth_routes = Blueprint('auth', __name__)

#csrf into response
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

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    # handling JSON payloads
    data = request.get_json()
    
  
    logging.info(f"Raw JSON data: {data}")

    form = SignUpForm(data=data) 

    if form.validate():
        user = User(
            username=data['username'],
            email=data['email'],
            password=generate_password_hash(data['password']),
            fname=data['fname'],
            lname=data['lname'],
            phone_num=data['phone_num'],
            address=data['address'],
            city=data['city'],
            state=data['state'],
            zip=data['zip']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify(user.to_dict())
    
    
    logging.error(f"Form errors: {form.errors}")
    return jsonify({'errors': form.errors}), 400



# Guide Login Route 
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

# Guide Signup Route 
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
