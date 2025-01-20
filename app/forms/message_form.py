from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired

class MessageForm(FlaskForm):
    user_id = IntegerField('user_id')
    guide_id = IntegerField('guide_id')
    message = TextAreaField('message', validators=[DataRequired()])