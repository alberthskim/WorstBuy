from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__='products'

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(255), nullable = False)
    model = db.Column(db.String(255), unique = True)
    category = db.Column(db.String(255))
    price = db.Column(db.Numeric(scale = 2, asdecimal = True), nullable = False)
    image_url = db.Column(db.String, nullable = False)
    description = db.Column(db.String(5000), nullable = False)

    reviews = db.relationship('Review', back_populates = 'product', cascade = "all, delete-orphan")
    product_images = db.relationship('ProductImage', back_populates='product', cascade = "all, delete-orphan")
    user = db.relationship('User', back_populates = 'products')
    cart = db.relationship('CartItem', back_populates = 'product', cascade = "all, delete-orphan")
    item = db.relationship('SavedItem', back_populates = 'product', cascade = "all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "name": self.name,
            "model": self.model,
            "category": self.category,
            "price": self.price,
            "imageUrl": self.image_url,
            "description": self.description,
            "reviews": {},
            "productImages": {},
            # "reviews": [review.to_dict() for review in self.reviews],
            # "productImages": [product_image.to_dict() for product_image in self.product_images]
        }
