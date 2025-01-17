from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField, FloatField, URLField
from wtforms.validators import DataRequired, NumberRange, URL

class ServiceForm(FlaskForm):
    guide_id = IntegerField('guide_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    cost = FloatField('cost', validators=[DataRequired(), NumberRange(min=0)])
    images = URLField('images', validators=[DataRequired(), URL()])
    reviews = TextAreaField('reviews')
    experience_requirement = StringField('experience_requirement', validators=[DataRequired()])
    about_guide = TextAreaField('about_guide', validators=[DataRequired()])