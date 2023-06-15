from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Product, Review, ProductImage
from app.forms import ReviewForm

product_routes = Blueprint('products', __name__)

## Get All Products - NEED TO TEST
@product_routes.route('/')
def all_products():
    """
    Query for all products with reviews
    """

    #Grabs All Products
    products = Product.query.all()

    #Grabs All Review
    reviews = Review.query.all()

    #Grabs ALL Product Images
    product_images = ProductImage.query.all()
    product_list = [product.to_dict() for product in products]
    review_list = [review.to_dict() for review in reviews]
    product_images_list = [images.to_dict() for images in product_images]

    #Iterate through to get the amount of reviews for front page
    for product in product_list:
        review_dict = []
        product_images_dict = []
        for review in review_list:
            if product['id'] == review['productId']:
                review_dict.append(review)
                product['reviews'] = review_dict
        for image in product_images_list:
            if product['id'] == image['productId']:
                product_images_dict.append(image)
                product['productImages'] = product_images_dict

    #return normalized list
    normalized_obj = {}
    for product in product_list:
        product_id = product['id']
        normalized_obj[product_id] = product

    return normalized_obj


@product_routes.route('/<int:productId>')
def single_product(productId):
    """
    Query for a single product with its images and reviews
    """

    #Grab the single product by its id
    product = Product.query.get(productId)
    product_dict = product.to_dict()

    product_review = product.reviews
    product_review_dict = [review.to_dict() for review in product_review]


    #Grab the product images related to the product
    product_images = product.product_images
    product_images_dict = [image.to_dict() for image in product_images]

    product_dict['productImages'] = product_images_dict
    product_dict['reviews'] = product_review_dict

    return product_dict




## REVIEW QUERIES/CRUDS BELOW

# CREATE A REVIEW - NEED TO TEST
@product_routes.route('/<int:productId>/reviews', methods = ['POST'])
@login_required
def create_review(productId):
    """
    Create a review
    """

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            product_id = productId,
            user_id = current_user.id,
            rating = form.data['rating'],
            review_content = form.data['review_content'],
            title = form.data['title'],
            review_url = form.data['review_url'],
            value = form.data['value'],
            quality = form.data['quality'],
            purchased = form.data['purchased'],
            recommendation = form.data['recommendation'],
            display_name = form.data['display_name']
        )

        db.session.add(review)
        db.session.commit()

        review_dict = review.to_dict()
        return review_dict

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Update A Review - NEED TO TEST
@product_routes.route('/<int:productId>/reviews/<int:reviewId>', methods = ['PUT'])
@login_required
def update_review(reviewId):
    """
    Update a review
    """
    form = ReviewForm()
    review = Review.query.get(reviewId)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.review_content = form.data['review_content']
        review.title = form.data['title']
        review.value = form.data['value']
        review.quality = form.data['quality']
        review.purchased = form.data['purchased']
        review.recommendation = form.data['recommendation']
        review.display_name = form.data['display_name']

        db.session.commit()
        return review.to_dict()

    if form.errors:
        return jsonify({"errors": form.errors})


# Delete a review - NEED TO TEST
@product_routes.route('/<int:productId>/reviews/<int:reviewId>', methods = ['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)
    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Successfully Deleted!"})
