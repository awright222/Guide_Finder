from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import not_
from app.models import User, db

user_routes = Blueprint('users', __name__)


def auth_required():
    return jsonify({"message": "Authentication required"}), 401


def forbidden():
    return jsonify({"message": "Forbidden"}), 403

# Get all users
@user_routes.route('/', methods=['GET'])
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# Get all real users (excluding demo users)
@user_routes.route('/real', methods=['GET'])
@login_required
def real_users():
    excluded_usernames = ["demo-client", "demo-manager"]
    users = User.query.filter(not_(User.username.in_(excluded_usernames))).all()
    return {'users': [user.to_dict() for user in users]}

# Get a user by ID
@user_routes.route('/<int:id>', methods=['GET'])
@login_required
def user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return user.to_dict()

# Update the profile of the logged-in user
@user_routes.route('/profile', methods=['PUT'])
@login_required
def update_profile():
    data = request.get_json()
    user = User.query.get(current_user.id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    user.firstname = data.get('firstname', user.firstname)
    user.lastname = data.get('lastname', user.lastname)
    user.email = data.get('email', user.email)
    user.phone_num = data.get('phone_num', user.phone_num)
    user.address = data.get('address', user.address)
    user.city = data.get('city', user.city)
    user.state = data.get('state', user.state)
    user.zip = data.get('zip', user.zip)
    user.username = data.get('username', user.username)

    try:
        db.session.commit()
        return jsonify(user.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Internal server error"}), 500

# Update a user by ID
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    data = request.get_json()
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    user.firstname = data.get('firstname', user.firstname)
    user.lastname = data.get('lastname', user.lastname)
    user.email = data.get('email', user.email)
    user.phone_num = data.get('phone_num', user.phone_num)
    user.address = data.get('address', user.address)
    user.city = data.get('city', user.city)
    user.state = data.get('state', user.state)
    user.zip = data.get('zip', user.zip)
    user.username = data.get('username', user.username)
    user.password = data.get('password', user.password)
    user.is_manager = data.get('is_manager', user.is_manager)

    try:
        db.session.commit()
        return jsonify(user.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Internal server error"}), 500

# Delete a user by ID
@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User successfully deleted"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Internal server error"}), 500