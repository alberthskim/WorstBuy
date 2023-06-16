from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, CartItem

cart_routes = Blueprint('cart', __name__)



## Get all Users Cart
@cart_routes.route('/<int:userId>')
def user_cart(userId):
    cartItems = CartItem.query.filter(CartItem.user_id == userId)
    cartItem_list = [cartItem.to_dict() for cartItem in cartItems]
    return cartItem_list



## CREATE A CART
@cart_routes.route('/items', methods=['POST'])
def create_cart(productId, quantity):
    """
    Create a cart
    """

    cart = CartItem(
        quantity = quantity,
        user_id = current_user.id,
        product_id = productId
    )

    db.session.add(cart)
    db.session.commit()

    return cart.to_dict()



## UPDATE A CART
@cart_routes.route('/item/edit', methods=['PUT'])
@login_required
def update_cart(userId, productId, quantity):
    """
    Update a cart
    """
    #This queries for the CartItem that matches the current user thats logged in and the product that matches what was requested.
    cartItem = CartItem.query.filter(CartItem.user_id == userId and CartItem.product_id == productId)
    # ex: [{id: 1, user_id: 2, product_id: 1, quantity: 1}]
    cart = cartItem[0]
    # ex: {id: 1, user_id: 2, product_id: 1, quantity: 1}
    cart.quantity = quantity
    # ex: {id: 1, user_id: 2, product_id: 1, quantity: 5}

    db.session.commit()

    return {'cartId':cart.id, 'quantity': cart.quantity}


## DELETE A CART
@cart_routes.route('/item/delete', methods=['DELETE'])
@login_required
def update_cart(userId, productId):
    """
    Delete a cart
    """

    cartItem = CartItem.query.filter(CartItem.user_id == userId and CartItem.product_id == productId)
    db.session.delete(cartItem)

    return jsonify({"message": "Successfully Deleted Cart Item!"})
