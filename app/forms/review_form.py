from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import Length, DataRequired


class ReviewForm(FlaskForm):
    rating = IntegerField("Rating", validators=[DataRequired()])
    review_content = StringField('Content', validators=[DataRequired(), Length(min=1, max=500)])
    title = StringField('Title', validators=[DataRequired(), Length(min=1, max=500)])
    review_url = StringField('Image')
    value = IntegerField("Value")
    quality = IntegerField("Quality")
    purchased = StringField("Purchased?")
    recommendation = StringField("Recommend?")
    display_name = StringField("Display Name", validators = [DataRequired(), Length(min=4, max=50)])
