from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
    __tablename__='product_images'

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    image_url = db.Column(db.String, nullable = False)


    product = db.relationship('Product', back_populates="product_images")

    def to_dict(self):
        return {
            "id": self.id,
            "productId": self.product_id,
            "imageUrl": self.image_url
        }
