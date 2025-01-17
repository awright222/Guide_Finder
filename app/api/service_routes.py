from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Service, db
from app.forms import ServiceForm

service_routes = Blueprint('services', __name__)

@service_routes.route('/search', methods=['GET'])
def search_services():
    name = request.args.get('name')
    state = request.args.get('state')
    country = request.args.get('country')
    activity_type = request.args.get('activity_type')
    experience_level = request.args.get('experience_level')

    query = Service.query

    if name:
        query = query.filter(Service.title.ilike(f'%{name}%'))
    if state:
        query = query.filter(Service.state.ilike(f'%{state}%'))
    if country:
        query = query.filter(Service.country.ilike(f'%{country}%'))
    if activity_type:
        query = query.filter(Service.type.ilike(f'%{activity_type}%'))
    if experience_level:
        query = query.filter(Service.experience_requirement.ilike(f'%{experience_level}%'))

    try:
        services = query.all()
        services_dict = [service.to_dict(exclude_bookings=True) for service in services]
        return jsonify(services_dict), 200  
    except Exception as e:
        print(f"Error fetching services: {e}")
        return jsonify({'error': 'An error occurred while fetching services'}), 500

@service_routes.route('/', methods=['POST'])
@login_required
def create_service():
    form = ServiceForm()
    if form.validate_on_submit():
        service = Service(
            guide_id=current_user.id,
            title=form.data['title'],
            type=form.data['type'],
            location=form.data['location'],
            country=form.data['country'],
            state=form.data['state'],
            description=form.data['description'],
            cost=form.data['cost'],
            images=form.data['images'],
            experience_requirement=form.data['experience_requirement'],
            about_guide=form.data['about_guide']
        )
        db.session.add(service)
        db.session.commit()
        return service.to_dict(), 201
    return jsonify({'errors': form.errors}), 400