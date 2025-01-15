from app.models import db, Message
from datetime import datetime

def seed_messages():
    messages = [
        Message(
            user_id=1,  
            guide_id=2,  
            message="Hello, I have a question about your service.",
            timestamp=datetime.utcnow()
        ),
        Message(
            user_id=1,  
            guide_id=2,  
            message="Can you provide more details?",
            timestamp=datetime.utcnow()
        ),
        Message(
            user_id=2,
            guide_id=10, 
            message="Is this service available next week?",
            timestamp=datetime.utcnow()
        ),
        Message(
            user_id=2,
            guide_id=11, 
            message="What is the cost of this service?",
            timestamp=datetime.utcnow()
        ),
        Message(
            user_id=3,
            guide_id=11,  
            message="Can I book this service for a group?",
            timestamp=datetime.utcnow()
        ),
        Message(
            user_id=3,
            guide_id=12,  
            message="Do you offer any discounts?",
            timestamp=datetime.utcnow()
        ),
    ]

    for message in messages:
        db.session.add(message)

    db.session.commit()

def undo_messages():
    db.session.execute("DELETE FROM messages")
    db.session.commit()