from flask import Blueprint
from app.models import Review

review_routes = Blueprint('reviews', __name__)

## Get all Reviews for single product
@review_routes.route('<int:productId>')
def all_reviews(productId):
    """
    Query for all single product reviews
    """

    reviews = Review.query.filter(Review.product_id == productId)
    reviews_list = [review.to_dict() for review in reviews]
    return reviews_list
