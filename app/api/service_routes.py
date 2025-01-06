from flask import Blueprint, jsonify, request
from flask_wtf.csrf import validate_csrf
from ..models import Service, User, db
from app.forms import ServiceForm

service_routes = Blueprint('services', __name__)

@service_routes.route('/')
def services():
    services = Service.query.all()
    return {'services': [service.to_dict() for service in services]}

@service_routes.route('/', methods=['POST'])
def create_service():
    form = ServiceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_service = Service(
            guide_id=form.guide_id.data,
            type=form.type.data,
            location=form.location.data,
            country=form.country.data,
            state=form.state.data,
            description=form.description.data,
            cost=form.cost.data,
            images=form.images.data,
            reviews=form.reviews.data,
            experience_requirement=form.experience_requirement.data,
            about_guide=form.about_guide.data
        )

        db.session.add(new_service)
        db.session.commit()
        return jsonify({"Service": new_service.to_dict()}), 201
    return jsonify({"errors": form.errors}), 400

@service_routes.route('/<int:id>')
def service(id):
    service = Service.query.get(id)
    if not service:
        return jsonify({"error": "Service not found"}), 404
    return service.to_dict()

@service_routes.route('/<int:id>', methods=['PUT'])
def update_service(id):
    form = ServiceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        service = Service.query.get(id)
        if not service:
            return jsonify({"error": "Service not found"}), 404

        service.guide_id = form.guide_id.data
        service.type = form.type.data
        service.location = form.location.data
        service.country = form.country.data
        service.state = form.state.data
        service.description = form.description.data
        service.cost = form.cost.data
        service.images = form.images.data
        service.reviews = form.reviews.data
        service.experience_requirement = form.experience_requirement.data
        service.about_guide = form.about_guide.data

        db.session.commit()
        return jsonify({"service": service.to_dict()})
    return jsonify({"errors": form.errors}), 400

@service_routes.route('/<int:id>', methods=['DELETE'])
def delete_service(id):
    csrf_token = request.cookies.get('csrf_token')

    try:
        validate_csrf(csrf_token)
    except Exception as e:
        return jsonify({"error": "CSRF token is invalid or missing"}), 400

    service = Service.query.get(id)
    if not service:
        return jsonify({"error": "Service not found"}), 404

    db.session.delete(service)
    db.session.commit()
    return jsonify({"message": "Service was deleted"})