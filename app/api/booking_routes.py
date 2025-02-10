from flask import Blueprint, jsonify, request
from flask_wtf.csrf import validate_csrf
from flask_login import current_user
from datetime import datetime
from sqlalchemy import func
from ..models import db, Booking, Service
from ..forms import BookingForm

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route('/', methods=['GET'])
def get_bookings():
    try:
        bookings = Booking.query.all()
        return {'bookings': [booking.to_dict() for booking in bookings]}
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@booking_routes.route('/<int:id>', methods=['GET'])
def get_booking_by_id(id):
    try:
        booking = Booking.query.get(id)
        if not booking:
            return jsonify({'message': 'Booking not found'}), 404
        return jsonify({'booking': booking.to_dict()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@booking_routes.route('/user', methods=['GET'])
def get_bookings_by_user():
    try:
        if not current_user.is_authenticated:
            return jsonify({"message": "User is not authenticated"}), 401
        
        bookings = Booking.query.filter(Booking.client_id == current_user.id).all()
        return jsonify({"bookings": [booking.to_dict() for booking in bookings]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@booking_routes.route('/service/<int:service_id>', methods=['GET'])
def get_bookings_by_service(service_id):
    try:
        bookings = Booking.query.filter(Booking.service_id == service_id).all()
        return jsonify({"bookings": [booking.to_dict() for booking in bookings]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@booking_routes.route('/', methods=['POST'])
def create_booking():
    try:
        form = BookingForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        data = request.get_json()
        form.client_id.data = data.get('client_id')
        form.service_id.data = data.get('service_id')
        form.start_date.data = datetime.fromisoformat(data.get('start_date'))
        form.end_date.data = datetime.fromisoformat(data.get('end_date'))
        form.cost.data = data.get('cost')

        service = Service.query.get(form.service_id.data)
        if not service:
            return jsonify({"error": "Service not found"}), 404

        if service.booking_length:
            form.end_date.data = form.start_date.data + timedelta(days=service.booking_length)
            form.cost.data = service.cost
        elif service.daily_rate:
            days = (form.end_date.data - form.start_date.data).days
            form.cost.data = service.daily_rate * days

        if form.validate_on_submit():
            new_booking = Booking(
                client_id=form.client_id.data,
                service_id=form.service_id.data,
                start_date=form.start_date.data,
                end_date=form.end_date.data,
                cost=form.cost.data,
            )

            db.session.add(new_booking)
            db.session.commit()
            return jsonify({"message": "Booking created successfully!", "booking": new_booking.to_dict()}), 201
        
        return jsonify({"errors": form.errors}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@booking_routes.route('/<int:id>', methods=['PUT'])
def update_booking(id):
    try:
        form = BookingForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        data = request.get_json()
        form.client_id.data = data.get('client_id')
        form.service_id.data = data.get('service_id')
        form.start_date.data = datetime.fromisoformat(data.get('start_date'))
        form.end_date.data = datetime.fromisoformat(data.get('end_date'))
        form.cost.data = data.get('cost')

        service = Service.query.get(form.service_id.data)
        if not service:
            return jsonify({"error": "Service not found"}), 404

        if service.booking_length:
            form.end_date.data = form.start_date.data + timedelta(days=service.booking_length)
            form.cost.data = service.cost
        elif service.daily_rate:
            days = (form.end_date.data - form.start_date.data).days
            form.cost.data = service.daily_rate * days

        if form.validate_on_submit():
            booking = Booking.query.get(id)
            if not booking:
                return jsonify({"error": "Booking not found"}), 404
            
            booking.client_id = form.client_id.data
            booking.service_id = form.service_id.data
            booking.start_date = form.start_date.data
            booking.end_date = form.end_date.data
            booking.cost = form.cost.data

            db.session.commit()
            return jsonify({"message": "Booking updated successfully!", "booking": booking.to_dict()}), 200
        
        return jsonify({"errors": form.errors}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@booking_routes.route('/<int:id>', methods=['DELETE'])
def delete_booking(id):
    try:
        csrf_token = request.cookies.get('csrf_token')
        try:
            validate_csrf(csrf_token)
        except Exception as e:
            return jsonify({"error": "CSRF token is invalid or missing"}), 400
        
        booking = Booking.query.get(id)
        if not booking:
            return jsonify({"error": "Booking not found"}), 404
        
        db.session.delete(booking)
        db.session.commit()
        return jsonify({"message": "Booking deleted successfully"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500