from flask import Blueprint, request, jsonify
from app.models import Service
from app.forms import ServiceForm
from app import db

service_routes = Blueprint('services', __name__)

@service_routes.route('/api/services', methods=['POST'])
def create_service():
    form = ServiceForm()
    if form.validate_on_submit():
        service = Service(
            guide_id=form.guide_id.data,
            type=form.type.data,
            location=form.location.data,
            description=form.description.data,
            cost=form.cost.data,
            images=form.images.data,
            reviews=form.reviews.data
        )
        db.session.add(service)
        db.session.commit()
        return jsonify(service.to_dict()), 201
    return jsonify({'message': 'Validation error', 'errors': form.errors}), 400

@service_routes.route('/api/services/<int:service_id>', methods=['PUT'])
def update_service(service_id):
    service = Service.query.get(service_id)
    if not service:
        return jsonify({'message': 'Service not found'}), 404

    form = ServiceForm()
    if form.validate_on_submit():
        service.guide_id = form.guide_id.data
        service.type = form.type.data
        service.location = form.location.data
        service.description = form.description.data
        service.cost = form.cost.data
        service.images = form.images.data
        service.reviews = form.reviews.data
        db.session.commit()
        return jsonify(service.to_dict()), 200
    return jsonify({'message': 'Validation error', 'errors': form.errors}), 400

@service_routes.route('/api/services/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):
    service = Service.query.get(service_id)
    if not service:
        return jsonify({'message': 'Service not found'}), 404

    db.session.delete(service)
    db.session.commit()
    return jsonify({'message': 'Service successfully deleted'}), 200

@service_routes.route('/api/services/<int:service_id>', methods=['GET'])
def get_service_details(service_id):
    service = Service.query.get(service_id)
    if not service:
        return jsonify({'message': 'Service not found'}), 404

    return jsonify(service.to_dict()), 200

@service_routes.route('/api/services', methods=['GET'])
def get_all_services():
    services = Service.query.all()
    return jsonify([service.to_dict() for service in services]), 200

@service_routes.route('/api/services/search', methods=['GET'])
def search_services():
    query_params = request.args
    services = Service.query.filter_by(**query_params).all()
    return jsonify([service.to_dict() for service in services]), 200