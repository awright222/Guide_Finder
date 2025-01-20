from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired

class MessageForm(FlaskForm):
    user_id = IntegerField('user_id')
    guide_id = IntegerField('guide_id')
    service_id = IntegerField('service_id', validators=[DataRequired()])
    message = TextAreaField('message', validators=[DataRequired()])