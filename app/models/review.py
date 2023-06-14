from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__='reviews'

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    rating = db.Column(db.Integer, nullable = False)
    review_content = db.Column(db.String(500), nullable = False)
    title = db.Column(db.String(100))
    review_url = db.Column(db.String(255), nullable = True)
    value = db.Column(db.Integer, nullable = True)
    quality = db.Column(db.Integer, nullable = True)
    purchased = db.Column(db.Boolean)
    recommendation = db.Column(db.Boolean)
    display_name = db.Column(db.String(50), nullable = False)
    created_at = db.Column(db.DateTime, default = datetime.utcnow())

    user = db.relationship('User', back_populates = 'reviews')
    product = db.relationship('Product', back_populates = 'reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "productId": self.product_id,
            "rating": self.rating,
            "reviewContent": self.review_content,
            "title": self.title,
            "reviewUrl": self.review_url,
            "value": self.value,
            "quality": self.quality,
            "purchased": self.purchased,
            "recommendation": self.recommendation,
            "displayName": self.display_name,
            "createdAt": self.created_at
        }
