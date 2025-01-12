from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from app.models import Service
from . import service_routes

service_routes = Blueprint('service_routes', __name__)

@service_routes.route('/search', methods=['GET'])
def search_services():
    name = request.args.get('name')
    state = request.args.get('state')
    country = request.args.get('country')
    activity_type = request.args.get('activity_type')
    experience_level = request.args.get('experience_level')

    
    query = Service.query.options(joinedload(Service.guide)) 


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
        print(f"Fetched {len(services)} services.") 

        services_dict = [service.to_dict(exclude_bookings=True) for service in services]

        return jsonify(services_dict), 200  
    except Exception as e:
        print(f"Error fetching services: {e}")
        return jsonify({'error': 'An error occurred while fetching services'}), 500