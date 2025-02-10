from . import db

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    guide_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
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

    guide = db.relationship('User', back_populates='services')
    bookings = db.relationship('Booking', back_populates='service', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='service', cascade='all, delete-orphan')
    messages = db.relationship('Message', back_populates='service', cascade='all, delete-orphan') 

    def to_dict(self, exclude_bookings=False):
        service_dict = {
            'id': self.id,
            'guide_id': self.guide_id,
            'title': self.title,
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

        if not exclude_bookings:
            service_dict['bookings'] = [booking.to_dict() for booking in self.bookings]

        return service_dict