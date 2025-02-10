from app.models import db, Booking, Service, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime, timedelta

def seed_bookings():
    services = Service.query.all()
    bookings = []

    for i, service in enumerate(services, start=1):
        start_date = datetime.now() + timedelta(days=10 + i)
        if service.booking_length:
            end_date = start_date + timedelta(days=service.booking_length)
            cost = service.cost
        elif service.daily_rate:
            days = 5 
            end_date = start_date + timedelta(days=days)
            cost = service.daily_rate * days
        else:
            end_date = start_date + timedelta(days=1)  
            cost = 300.00 

        booking = Booking(
            client_id=i, 
            service_id=service.id,
            start_date=start_date,
            end_date=end_date,
            cost=cost
        )
        bookings.append(booking)

    for booking in bookings:
        db.session.add(booking)

    db.session.commit()

def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()