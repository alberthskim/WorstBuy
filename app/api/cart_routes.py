from flask import Blueprint, jsonify, request, json
from flask_login import login_required, current_user
from app.models import db, CartItem

cart_routes = Blueprint('cart', __name__)



## CREATE A CART
@cart_routes.route('/items', methods=['POST'])
def create_cart():
    """
    Create a cart
    """

    # This grabs the request from the front end thunk with the productId and quantity
    data = request.get_json()

    # This queries the database to find the current users cart and see if they have a product that matches what they wanted to add
    cartItem = CartItem.query.filter(CartItem.user_id == current_user.id, CartItem.product_id == data['productId']).first()

    #If that cartItem exists, we increment its quantity
    if cartItem:
        cartItem.quantity += data['quantity']
    #else we create a new cartItem set with the information below
    else:
        cartItem = CartItem(
            quantity=data['quantity'],
            user_id=current_user.id,
            product_id=data['productId']
        )

        db.session.add(cartItem)

    db.session.commit()

    return cartItem.to_dict()
    # data = json.loads(request.data)
    # print("THIS IS THE MEGA DATA-----", data)
    # cartItem = CartItem.query.filter_by(CartItem.user_id == current_user.id, CartItem.product_id == data['productId'])
    # print("YOOEAKFOEAFEAOFKEAOFKOEA------", cartItem[0])
    # if cartItem[0]:
    #     cartItem[0].quantity += data['quantity']
    # else:
    #     cart = CartItem(
    #         quantity = data['quantity'],
    #         user_id = current_user.id,
    #         product_id = data['productId']
    #     )

    #     db.session.add(cart)
    # db.session.commit()

    # return cart.to_dict()


## Get all Users Cart
@cart_routes.route('/<int:userId>')
def user_cart(userId):
    cartItems = CartItem.query.filter(CartItem.user_id == userId)
    cartItem_list = [cartItem.to_dict() for cartItem in cartItems]
    return cartItem_list

## UPDATE A CART
@cart_routes.route('/item/edit', methods=['PUT'])
def update_cart():
    """
    Update a cart
    """
    data = request.get_json()


    #This queries for the CartItem that matches the current user thats logged in and the product that matches what was requested.
    cartItem = CartItem.query.filter(CartItem.user_id == data['userId'], CartItem.product_id == data['productId']).first()

    cartItem.quantity = data['quantity']
    # ex: {id: 1, user_id: 2, product_id: 1, quantity: 5}

    db.session.commit()

    return cartItem.to_dict()


## DELETE A CART
@cart_routes.route('/item/delete', methods=['DELETE'])
@login_required
def delete_cart(userId, productId):
    """
    Delete a cart
    """

    cartItem = CartItem.query.filter(CartItem.user_id == userId and CartItem.product_id == productId)
    db.session.delete(cartItem)

    return jsonify({"message": "Successfully Deleted Cart Item!"})
