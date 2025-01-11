from flask import request, jsonify
from sqlalchemy.orm import joinedload
from .models import Service
from . import service_routes

@service_routes.route('/search', methods=['GET'])
def search_services():
    name = request.args.get('name')
    state = request.args.get('state')
    country = request.args.get('country')
    activity_type = request.args.get('activity_type')
    experience_level = request.args.get('experience_level')

    # Initialize the query and apply eager loading to avoid multiple queries for related data
    query = Service.query.options(joinedload(Service.guide))  # Eager load related guide data (without bookings)

    # Apply filters if provided
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
        # Execute the query and fetch the services
        services = query.all()
        print(f"Fetched {len(services)} services.")  # Log the number of fetched services for debugging

        # Serialize the services data and exclude the bookings
        services_dict = [service.to_dict(exclude_bookings=True) for service in services]

        return jsonify(services_dict), 200  # Return the filtered services in the response
    except Exception as e:
        # Log any errors that occur during the process
        print(f"Error fetching services: {e}")
        return jsonify({'error': 'An error occurred while fetching services'}), 500
