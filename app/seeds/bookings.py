from app.models import db, Booking
from datetime import datetime, timedelta

def seed_bookings():
    bookings = [
        Booking(
            client_id=1,
            service_id=1,
            start_date=datetime.now() + timedelta(days=10),
            end_date=datetime.now() + timedelta(days=15),
            cost=300.00
        ),
        Booking(
            client_id=2,
            service_id=2,
            start_date=datetime.now() + timedelta(days=11),
            end_date=datetime.now() + timedelta(days=16),
            cost=350.00
        ),
        Booking(
            client_id=3,
            service_id=3,
            start_date=datetime.now() + timedelta(days=12),
            end_date=datetime.now() + timedelta(days=17),
            cost=250.00
        ),
        Booking(
            client_id=4,
            service_id=4,
            start_date=datetime.now() + timedelta(days=13),
            end_date=datetime.now() + timedelta(days=18),
            cost=300.00
        ),
        Booking(
            client_id=5,
            service_id=5,
            start_date=datetime.now() + timedelta(days=14),
            end_date=datetime.now() + timedelta(days=19),
            cost=400.00
        ),
        Booking(
            client_id=6,
            service_id=6,
            start_date=datetime.now() + timedelta(days=15),
            end_date=datetime.now() + timedelta(days=20),
            cost=500.00
        ),
        Booking(
            client_id=7,
            service_id=7,
            start_date=datetime.now() + timedelta(days=16),
            end_date=datetime.now() + timedelta(days=21),
            cost=450.00
        ),
        Booking(
            client_id=8,
            service_id=8,
            start_date=datetime.now() + timedelta(days=17),
            end_date=datetime.now() + timedelta(days=22),
            cost=350.00
        ),
        Booking(
            client_id=9,
            service_id=9,
            start_date=datetime.now() + timedelta(days=18),
            end_date=datetime.now() + timedelta(days=23),
            cost=400.00
        ),
        Booking(
            client_id=10,
            service_id=10,
            start_date=datetime.now() + timedelta(days=19),
            end_date=datetime.now() + timedelta(days=24),
            cost=300.00
        )
    ]

    for booking in bookings:
        db.session.add(booking)

    db.session.commit()

def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()