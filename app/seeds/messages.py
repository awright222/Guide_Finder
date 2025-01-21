from app.models import db, Message, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime

def seed_messages():
    messages = [
        Message(
            user_id=1,
            guide_id=3,
            service_id=1,
            message="Hello, I have a question about your service.",
            timestamp=datetime.utcnow(),
            read=False,
            deleted=False
        ),
        Message(
            user_id=1,  
            guide_id=3,  
            service_id=1,
            message="Can you provide more details?",
            timestamp=datetime.utcnow(),
            read=False,
            deleted=False
        ),
        Message(
            user_id=3,
            guide_id=1, 
            service_id=1,
            message="Sure, what would you like to know?",
            timestamp=datetime.utcnow(),
            read=False,
            deleted=False
        ),
        Message(
            user_id=1,
            guide_id=3, 
            service_id=1,
            message="Is this service available next week?",
            timestamp=datetime.utcnow(),
            read=False,
            deleted=False
        ),
        Message(
            user_id=3,
            guide_id=1, 
            service_id=1,
            message="Yes, it is available next week.",
            timestamp=datetime.utcnow(),
            read=False,
            deleted=False
        ),
    ]

    for message in messages:
        db.session.add(message)

    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()