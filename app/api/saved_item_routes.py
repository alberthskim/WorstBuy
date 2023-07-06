from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, SavedItem

saved_item_routes = Blueprint('savedItem', __name__)


# GET ALL USERS SAVED ITEMS
@saved_item_routes.route('/<int:userId>')
def saved_item(userId):
    """
    Grab all users saved Items
    """
    savedItems = SavedItem.query.filter(SavedItem.user_id == userId)
    savedItem_list = [item.to_dict() for item in savedItems]
    return savedItem_list


## CREATE A SAVED ITEMS
@saved_item_routes.route('/item', methods=['POST'])
@login_required
def create_saved_item():
    """
    Create a saved Item
    """
    data = request.get_json()
    savedItem = SavedItem.query.filter(SavedItem.user_id == current_user.id, SavedItem.product_id == data['productId']).first()
    if savedItem:
        return jsonify({"message": "Item is already saved"})
    else:
        savedItem = SavedItem(
            user_id=current_user.id,
            product_id=data['productId']
        )

        db.session.add(savedItem)
    db.session.commit()
    return savedItem.to_dict()


## DELETE A SAVED ITEMS
@saved_item_routes.route('item/delete', methods=['DELETE'])
@login_required
def delete_saved_item():
    """
    Remove a saved Item
    """

    data = request.get_json()
    savedItem = SavedItem.query.filter(SavedItem.user_id == data['userId'], SavedItem.product_id == data['productId']).first()
    db.session.delete(savedItem)
    db.session.commit()

    return jsonify({"message": "Item has been successfully removed from the Saved Items List"})
