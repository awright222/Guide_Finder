from flask_wtf import FlaskForm
from wtforms import IntegerField, FloatField, DateTimeField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
    client_id = IntegerField('client_id', validators=[DataRequired()])
    service_id = IntegerField('service_id', validators=[DataRequired()])
    start_date = DateTimeField('start_date', validators=[DataRequired()], format='%Y-%m-%dT%H:%M:%S')
    end_date = DateTimeField('end_date', validators=[DataRequired()], format='%Y-%m-%dT%H:%M:%S')
    cost = FloatField('cost', validators=[DataRequired()])