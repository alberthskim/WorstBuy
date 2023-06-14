from flask import Blueprint
from app.models import Review

review_routes = Blueprint('reviews', __name__)

## Get all Reviews
@review_routes.route('/')
def all_reviews():
    """
    Query for all reviews
    """

    reviews = Review.query.all()
    reviews_list = [review.to_dict() for review in reviews]
    return reviews_list
