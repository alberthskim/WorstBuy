from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, SavedItem

saved_item_routes = Blueprint('savedItem', __name__)


## GET ALL Users SAVED ITEMS
@saved_item_routes('/<int:userId>')
def saved_item(userId):
    savedItems = SavedItem.query.filter(SavedItem.user_id == userId)
    savedItem_list = [item.to_dict() for item in savedItems]
    return savedItem_list


## 
