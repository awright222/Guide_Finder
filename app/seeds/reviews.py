from app.models import db, Review

def seed_reviews():
    reviews = [
        Review(
            service_id=1,
            user_id=2,
            title="Amazing Experience",
            review="I had an amazing time with this service. Highly recommend!",
            rating=5
        ),
        Review(
            service_id=1,
            user_id=3,
            title="Good but could be better",
            review="The service was good but there were a few issues.",
            rating=3
        ),
        Review(
            service_id=2,
            user_id=2,
            title="Not worth the money",
            review="I was disappointed with the service. Not worth the money.",
            rating=2
        ),
    ]

    for review in reviews:
        db.session.add(review)

    db.session.commit()

def undo_reviews():
    db.session.execute("DELETE FROM reviews")
    db.session.commit()