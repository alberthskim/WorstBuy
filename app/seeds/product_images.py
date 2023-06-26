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
    product_id = 2,
    image_url = 'https://i.imgur.com/KOgJ9BU.jpg'
  )

  product_image4 = ProductImage(
    product_id = 2,
    image_url = 'https://i.imgur.com/WXpsboN.jpg'
  )

  product_image5 = ProductImage(
    product_id = 3,
    image_url = 'https://i.imgur.com/94H1X4D.jpg'
  )

  product_image6 = ProductImage(
    product_id = 3,
    image_url = 'https://i.imgur.com/BJn6f3r.jpg'
  )

  product_image7 = ProductImage(
    product_id = 4,
    image_url = 'https://i.imgur.com/POldutr.jpg'
  )

  product_image8 = ProductImage(
    product_id = 4,
    image_url = 'https://i.imgur.com/AEk3cfl.jpg'
  )

  product_image9 = ProductImage(
    product_id = 5,
    image_url = 'https://i.imgur.com/r2SItmk.jpg'
  )

  product_image10 = ProductImage(
    product_id = 5,
    image_url = 'https://i.imgur.com/NKMUFhd.jpg'
  )

  product_image11 = ProductImage(
    product_id = 6,
    image_url = 'https://i.imgur.com/i0Mjqv4.png'
  )

  product_image12 = ProductImage(
    product_id = 6,
    image_url = 'https://i.imgur.com/C6IQQpP.png'
  )

  product_image13 = ProductImage(
    product_id = 7,
    image_url = 'https://i.imgur.com/HUlGWt5.jpg'
  )

  product_image14 = ProductImage(
    product_id = 7,
    image_url = 'https://i.imgur.com/jaRw7Cw.jpg'
  )

  product_image15 = ProductImage(
    product_id = 8,
    image_url = 'https://i.imgur.com/xZtOEul.jpg'
  )

  product_image16 = ProductImage(
    product_id = 8,
    image_url = 'https://i.imgur.com/I35ri2G.jpg'
  )

  product_image17 = ProductImage(
    product_id = 9,
    image_url = 'https://i.imgur.com/Hllpwka.jpg'
  )

  product_image18 = ProductImage(
    product_id = 9,
    image_url = 'https://i.imgur.com/1aL4wck.jpg'
  )

  product_image19 = ProductImage(
    product_id = 10,
    image_url = 'https://i.imgur.com/8Wkpqgy.jpg'
  )

  product_image20 = ProductImage(
    product_id = 10,
    image_url = 'https://i.imgur.com/h74dE5e.jpg'
  )

  product_image21 = ProductImage(
    product_id = 11,
    image_url = 'https://i.imgur.com/x2C7cBw.jpg'
  )

  product_image22 = ProductImage(
    product_id = 11,
    image_url = 'https://i.imgur.com/HquEnVs.jpg'
  )

  product_image23 = ProductImage(
    product_id = 12,
    image_url = 'https://i.imgur.com/3sM7pDe.png'
  )

  product_image24 = ProductImage(
    product_id = 12,
    image_url = 'https://i.imgur.com/nyHygMS.png'
  )

  product_image25 = ProductImage(
    product_id = 13,
    image_url = 'https://i.imgur.com/jx2PiXl.jpg'
  )

  product_image26 = ProductImage(
    product_id = 13,
    image_url = 'https://i.imgur.com/TyO0t01.jpg'
  )

  product_image27 = ProductImage(
    product_id = 14,
    image_url = 'https://i.imgur.com/OlxaPaZ.png'
  )

  product_image28 = ProductImage(
    product_id = 14,
    image_url = 'https://i.imgur.com/xApfYRn.png'
  )

  product_image29 = ProductImage(
    product_id = 15,
    image_url = 'https://i.imgur.com/x5coxSf.jpg'
  )

  product_image30 = ProductImage(
    product_id = 15,
    image_url = 'https://i.imgur.com/JLr332n.jpg'
  )

  product_image31 = ProductImage(
    product_id = 16,
    image_url = 'https://i.imgur.com/rzhkgJS.png'
  )

  product_image32 = ProductImage(
    product_id = 16,
    image_url = 'https://i.imgur.com/7Ac9dqQ.jpg'
  )

  product_image33 = ProductImage(
    product_id = 17,
    image_url = 'https://i.imgur.com/QEMvjtW.jpg'
  )

  product_image34 = ProductImage(
    product_id = 17,
    image_url = 'https://i.imgur.com/LT2xcvT.jpg'
  )

  product_image35 = ProductImage(
    product_id = 18,
    image_url = 'https://i.imgur.com/rWQ6ZLZ.png'
  )

  product_image36 = ProductImage(
    product_id = 18,
    image_url = 'https://i.imgur.com/zV86mAI.png'
  )

  product_image37 = ProductImage(
    product_id = 19,
    image_url = 'https://i.imgur.com/uarfMjP.png'
  )

  product_image38 = ProductImage(
    product_id = 19,
    image_url = 'https://i.imgur.com/7iLvVEp.jpg'
  )

  product_image39 = ProductImage(
    product_id = 20,
    image_url = 'https://i.imgur.com/C6E7Sk6.jpg'
  )

  product_image40 = ProductImage(
    product_id = 20,
    image_url = 'https://i.imgur.com/tFuAOKj.jpg'
  )

  product_image41 = ProductImage(
    product_id = 21,
    image_url = 'https://i.imgur.com/RGn9hTJ.jpg'
  )

  product_image42 = ProductImage(
    product_id = 21,
    image_url = 'https://i.imgur.com/kIF2VI0.jpg'
  )


  product_images = [product_image1, product_image2, product_image3, product_image4, product_image5, product_image6, product_image7, product_image8, product_image9, product_image10, product_image11, product_image12, product_image13, product_image14, product_image15, product_image16, product_image17, product_image18, product_image19, product_image20, product_image21, product_image22, product_image23, product_image24, product_image25, product_image26, product_image27, product_image28, product_image29, product_image30, product_image31, product_image32, product_image33, product_image34, product_image35, product_image36, product_image37, product_image38, product_image39, product_image40, product_image41, product_image42]
  [db.session.add(image) for image in product_images]
  db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
