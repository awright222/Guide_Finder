from .db import db

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    guide_id = db.Column(db.Integer, db.ForeignKey('guides.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    cost = db.Column(db.Float, nullable=False)
    images = db.Column(db.String, nullable=False)
    reviews = db.Column(db.Text)
    experience_requirement = db.Column(db.String(50), nullable=False)
    about_guide = db.Column(db.Text, nullable=False)

    guide = db.relationship('Guide', back_populates='services')

    def to_dict(self):
        return {
            'id': self.id,
            'guide_id': self.guide_id,
            'type': self.type,
            'location': self.location,
            'country': self.country,
            'state': self.state,
            'description': self.description,
            'cost': self.cost,
            'images': self.images,
            'reviews': self.reviews,
            'experience_requirement': self.experience_requirement,
            'about_guide': self.about_guide
        }