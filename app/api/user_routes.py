from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)

# Error response for authentication required
def auth_required():
    return jsonify({"message": "Authentication required"}), 401

# Error response for forbidden access
def forbidden():
    return jsonify({"message": "Forbidden"}), 403

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    if not current_user.is_authenticated:
        return auth_required()
    users = User.query.all()
    return jsonify({'users': [user.to_dict() for user in users]})


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    if not current_user.is_authenticated:
        return auth_required()
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user.to_dict())


@user_routes.route('/profile', methods=['PUT'])
@login_required
def update_profile():
    """
    Updates the profile information of the logged-in User
    """
    if not current_user.is_authenticated:
        return auth_required()
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


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    """
    Updates and returns an existing User
    """
    if not current_user.is_authenticated:
        return auth_required()
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


@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    """
    Deletes an existing User
    """
    if not current_user.is_authenticated:
        return auth_required()
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