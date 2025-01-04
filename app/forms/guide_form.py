from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Guide

def guide_exists(form, field):
    email = field.data
    guide = Guide.query.filter(Guide.email == email).first()
    if guide:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    username = field.data
    guide = Guide.query.filter(Guide.username == username).first()
    if guide:
        raise ValidationError('Username is already in use.')

class GuideForm(FlaskForm):
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email(), guide_exists])
    phone_num = StringField('phone_num')
    address = StringField('address')
    city = StringField('city')
    state = StringField('state')
    zip = StringField('zip')
    businessname = StringField('businessname')
    insurance_provider_name = StringField('insurance_provider_name')
    insurance_number = StringField('insurance_number')
    services = StringField('services')
    username = StringField('username', validators=[DataRequired(), username_exists])
    password = PasswordField('password', validators=[DataRequired()])