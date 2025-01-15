from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

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

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = PasswordField('password', validators=[DataRequired()])
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    phone_num = StringField('phone_num')
    address = StringField('address')
    city = StringField('city')
    state = StringField('state')
    zip = StringField('zip')
    is_guide = BooleanField('is_guide')  # New field to identify guides
    businessname = StringField('businessname')
    insurance_provider_name = StringField('insurance_provider_name')
    insurance_number = StringField('insurance_number')



# from flask_wtf import FlaskForm
# from wtforms import StringField, PasswordField
# from wtforms.validators import DataRequired, Email, ValidationError
# from app.models import User


# def user_exists(form, field):
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


# class SignUpForm(FlaskForm):
#     username = StringField('username', validators=[DataRequired(), username_exists])
#     email = StringField('email', validators=[DataRequired(), Email(), user_exists])
#     password = PasswordField('password', validators=[DataRequired()])
#     firstname = StringField('firstname', validators=[DataRequired()])  
#     lastname = StringField('lastname', validators=[DataRequired()])  
#     phone_num = StringField('phone_num')
#     address = StringField('address')
#     city = StringField('city')
#     state = StringField('state')
#     zip = StringField('zip')
