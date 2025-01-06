from app.models import db, Review
from datetime import datetime

def seed_reviews():
    reviews = [
        Review(
            service_id=1,
            user_id=1,
            review="This was an amazing experience!",
            rating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            service_id=1,
            user_id=2,
            review="Had a great time!",
            rating=4,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            service_id=2,
            user_id=3,
            review="Challenging but rewarding.",
            rating=4,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            service_id=3,
            user_id=4,
            review="Fantastic fishing trip!",
            rating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            service_id=4,
            user_id=5,
            review="Exhilarating adventure!",
            rating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            service_id=5,
            user_id=6,
            review="A once-in-a-lifetime experience!",
            rating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            service_id=6,
            user_id=7,
            review="Very educational and important.",
            rating=4,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            service_id=7,
            user_id=8,
            review="A breathtaking climbing experience!",
            rating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            service_id=8,
            user_id=9,
            review="An unforgettable backpacking adventure!",
            rating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
        Review(
            service_id=9,
            user_id=10,
            review="Amazing experience!",
            rating=5,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ),
    ]

    for review in reviews:
        db.session.add(review)

    db.session.commit()

def undo_reviews():
    db.session.execute("DELETE FROM reviews")
    db.session.commit()