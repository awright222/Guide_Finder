from datetime import datetime
from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    guide_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)  
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    read = db.Column(db.Boolean, default=False) 
    deleted = db.Column(db.Boolean, default=False)  

    user = db.relationship('User', foreign_keys=[user_id]) 
    guide = db.relationship('User', foreign_keys=[guide_id])  
    service = db.relationship('Service', back_populates='messages') 

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'guide_id': self.guide_id,
            'service_id': self.service_id, 
            'message': self.message,
            'timestamp': self.timestamp.isoformat(),
            'read': self.read,  
            'deleted': self.deleted  
        }