from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, NumberRange

class ReviewForm(FlaskForm):
    service_id = IntegerField('service_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    review = TextAreaField('review', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired(), NumberRange(min=1, max=5)])