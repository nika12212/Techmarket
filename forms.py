from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, DecimalField, TextAreaField, FileField
from wtforms.validators import DataRequired, Email

class UserInfoForm(FlaskForm):

    name = StringField('Name', validators=[DataRequired()])
    id = StringField('id', validators=[DataRequired()])
    category = SelectField('Category', choices=[
        ('Smart watch', 'Smart watch'),
        ('Computer', 'Computer'),
        ('Mobile', 'Mobile'),
        ('Game console', 'Game console'),
        ('Tablet', 'Tablet'),
        ('Leptop', 'Leptop'),
        ('Macbook', 'Macbook'),
        ('Computer Accessories', 'Computer Accessories'),
        ('Headphones', 'Headphones')
    ], validators=[DataRequired()])
    price = DecimalField('Price', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    item_condition = SelectField('Item Condition', choices=[
        ('Used', 'Used'),
        ('New', 'New'),
        ('Like New', 'Like New')
    ], validators=[DataRequired()])
    image = FileField('Image')
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Submit')

