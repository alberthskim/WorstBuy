from .db import db, environment, SCHEMA, add_prefix_for_prod

class SavedItem(db.Model):
    __tablename__= 'saved_item'

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

    user = db.relationship('User', back_populates = 'item')
    product = db.relationship('Product', back_populates = 'item')


    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "productId": self.product_id,
            "quantity": self.quantity,
            "productName" : self.product.name,
            "productImage": self.product.image_url,
            "productPrice": self.product.price,
            "reviews": self.product.reviews
        }
