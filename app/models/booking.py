from datetime import datetime
from .db import db

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    cost = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    client = db.relationship('User', back_populates='bookings')
    service = db.relationship('Service', back_populates='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'client_id': self.client_id,
            'service_id': self.service_id,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'cost': self.cost,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }