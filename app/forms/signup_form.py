from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
import re

# Custom validation functions
def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

# Custom password complexity validation
def password_complexity(form, field):
    password = field.data
    if not re.search(r'[A-Z]', password):
        raise ValidationError('Password must contain at least one uppercase letter.')
    if not re.search(r'[a-z]', password):
        raise ValidationError('Password must contain at least one lowercase letter.')
    if not re.search(r'[0-9]', password):
        raise ValidationError('Password must contain at least one number.')
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        raise ValidationError('Password must contain at least one special character.')

# Custom phone number validation
def valid_phone_number(form, field):
    phone_number = re.sub(r'\D', '', field.data) 
    if len(phone_number) < 9 or len(phone_number) > 15:
        raise ValidationError('Invalid phone number. Please use a valid format.')

# Conditional field validation for 'is_guide'
def is_guide_required(form, field):
    if field.data and not form.businessname.data:
        raise ValidationError('Business name is required if you are a guide.')

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists, Length(min=3, max=20)])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = PasswordField('password', validators=[DataRequired(), password_complexity])
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    phone_num = StringField('phone_num', validators=[valid_phone_number])
    address = StringField('address')
    city = StringField('city')
    state = StringField('state')  
    zip = StringField('zip')
    is_guide = BooleanField('is_guide', validators=[is_guide_required])
    businessname = StringField('businessname')
    insurance_provider_name = StringField('insurance_provider_name')
    insurance_number = StringField('insurance_number')