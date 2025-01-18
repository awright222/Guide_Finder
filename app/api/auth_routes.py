from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, db
from app.forms import LoginForm, SignUpForm
from flask_wtf.csrf import generate_csrf

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401

@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        email = form.data['email']
        password = form.data['password']
        
        # Check if the email belongs to a user
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user)
            return jsonify({'user': user.to_dict(), 'role': 'guide' if user.is_guide else 'user'})
        
        return jsonify({'errors': ['Invalid email or password']}), 401

    return jsonify({'errors': form.errors}), 400

@auth_routes.route('/logout', methods=['POST'])
def logout():
    try:
        logout_user()  # Clear the user session
        session.clear()  # Clear server-side session data
        response = jsonify({'message': 'User logged out'})
        # Ensure the cookie is deleted properly
        response.delete_cookie('session', path='/', httponly=True)  
        print("Session cookie deleted.")
        return response
    except Exception as e:
        print(f"Error during logout: {e}")
        return jsonify({'error': str(e)}), 500


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            firstname=form.data['firstname'],
            lastname=form.data['lastname'],
            phone_num=form.data['phone_num'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zip=form.data['zip'],
            is_guide=form.data.get('is_guide', False),  # Handle guide signup
            businessname=form.data.get('businessname'),
            insurance_provider_name=form.data.get('insurance_provider_name'),
            insurance_number=form.data.get('insurance_number')
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': {'message': 'Unauthorized'}}, 401

@auth_routes.route('/csrf/restore', methods=['GET'])
def restore_csrf():
    return jsonify({'csrf_token': generate_csrf()})