from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_images():
  product_image1 = ProductImage(
    product_id = 1,
    image_url = 'https://i.imgur.com/kfVMO5D.jpg'
  )

  product_image2 = ProductImage(
    product_id = 1,
    image_url = 'https://i.imgur.com/x5lvohe.jpg'
  )

  product_image3 = ProductImage(
    product_id = 3,
    image_url = 'https://i.imgur.com/94H1X4D.jpg'
  )

  product_image4 = ProductImage(
    product_id = 4,
    image_url = 'https://i.imgur.com/POldutr.jpg'
  )

  product_image5 = ProductImage(
    product_id = 4,
    image_url = 'https://i.imgur.com/AEk3cfl.jpg'
  )

  product_image6 = ProductImage(
    product_id = 9,
    image_url = 'https://i.imgur.com/Hllpwka.jpg'
  )

  product_image7 = ProductImage(
    product_id = 10,
    image_url = 'https://i.imgur.com/8Wkpqgy.jpg'
  )

  product_image8 = ProductImage(
    product_id = 10,
    image_url = 'https://i.imgur.com/h74dE5e.jpg'
  )

  product_image9 = ProductImage(
    product_id = 13,
    image_url = 'https://i.imgur.com/jx2PiXl.jpg'
  )

  product_image10 = ProductImage(
    product_id = 15,
    image_url = 'https://i.imgur.com/x5coxSf.jpg'
  )

  product_image11 = ProductImage(
    product_id = 15,
    image_url = 'https://i.imgur.com/JLr332n.jpg'
  )

  product_images = [product_image1, product_image2, product_image3, product_image4, product_image5, product_image6, product_image7, product_image8, product_image9, product_image10, product_image11]
  [db.session.add(image) for image in product_images]
  db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
