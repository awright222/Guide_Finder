from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired

class MessageForm(FlaskForm):
    guide_id = IntegerField('guide_id', validators=[DataRequired()])
    message = TextAreaField('message', validators=[DataRequired()])
