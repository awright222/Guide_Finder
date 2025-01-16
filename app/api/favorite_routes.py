from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Favorite, Service

favorite_routes = Blueprint('favorites', __name__)

@favorite_routes.route('/', methods=['POST'])
@login_required
def add_favorite():
    data = request.get_json()
    service_id = data.get('service_id')

    favorite = Favorite(user_id=current_user.id, service_id=service_id)
    db.session.add(favorite)
    db.session.commit()
    response = jsonify(favorite.to_dict())
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response, 201

@favorite_routes.route('/<int:favorite_id>', methods=['DELETE'])
@login_required
def remove_favorite(favorite_id):
    favorite = Favorite.query.filter_by(id=favorite_id, user_id=current_user.id).first()
    if not favorite:
        response = jsonify({"message": "Favorite not found"})
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 404

    db.session.delete(favorite)
    db.session.commit()
    response = jsonify({"message": "Favorite successfully removed"})
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response, 200

@favorite_routes.route('/', methods=['GET'])
@login_required
def get_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).join(Service).all()
    response = jsonify([favorite.to_dict() for favorite in favorites])
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response, 200