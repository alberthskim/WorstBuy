from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    product1 = Product(
        user_id = 1,
        name = 'Human Door Stopper',
        model = 'S35932',
        category = 'Appliances',
        price = 15.99,
        image_url = 'https://i.imgur.com/21e8JZK.jpg',
        description = 'Introducing the human door stopper! Dislike someone? Paste a picture of their face on the human door stopper and slide it under your door. Comes in various colors: green, yellow, blue, black, pink'
    )

    product2 = Product(
        user_id = 1,
        name = 'Slurpin Ramen Noodle Pants',
        model = 'S45254',
        category = "Clothing",
        price = 24.99,
        image_url = 'https://i.imgur.com/TTiFRi4.jpg',
        description = 'The Ramen Noodle Pants! Best way to attract all the noodle lovers out there in the world.'
    )

    product3 = Product(
        user_id = 1,
        name = 'The ScooperDooker',
        model = 'S13213',
        category = "Beauty & Products",
        price = 6.99,
        image_url = 'https://i.imgur.com/oDfOviE.jpg',
        description = 'Every had an incident while in the restroom? This knife can come in handy! Can also be used for cleaning up after your pets!'
    )

    product4 = Product(
        user_id = 1,
        name = 'The Yolking Chicken',
        model = 'S84822',
        category = "Toys",
        price = 5.99,
        image_url = 'https://i.imgur.com/KVS28Wv.jpg',
        description = 'The ultimate yolking chicken keychain! Whenever feeling stresed, squeeze BAK BAK!'
    )

    product5 = Product(
        user_id = 1,
        name = 'Winner Winner Chicken Dinner Phone Case',
        model = 'S41231',
        category = "Technology",
        price = 12.99,
        image_url = 'https://i.imgur.com/MAQ1GSy.jpg',
        description = 'Always on your phone and feeling hungry? This phone case will remind you to get off your screen and get cooking!'
    )

    product6 = Product(
        user_id = 1,
        name = 'The Tesla Box Diaper',
        model = 'S91919',
        category = "Kids",
        price = 24.99,
        image_url = 'https://i.imgur.com/P3vuM7L.jpg',
        description = 'The Future babies are here! The ultimate human waste containment diaper with extra space and back support for babies.'
    )

    product7 = Product(
        user_id = 1,
        name = 'The Pet Rock',
        model = 'S32131',
        category = "Pets",
        price = 49.99,
        image_url = 'https://i.imgur.com/B8TX0os.jpg',
        description = 'Feeling Lonely and want to feel even lonelier? Why not get a pet rock. Make sure to give it a bath and feed it daily.'
    )

    product8 = Product(
        user_id = 1,
        name = 'The Middle-Aged Mutant Ninja Turtles',
        model = 'S42322',
        category = "Books",
        price = 19.99,
        image_url = 'https://i.imgur.com/gHjoK8S.jpg',
        description = 'The Teenage Ninja turtle has know grown up to be The Middle-Aged Ninja Turtles. Read as they become older and hit puberty.'
    )

    product9 = Product(
        user_id = 1,
        name = 'The Walking Human Lamp',
        model = 'S91914',
        category = "Appliances",
        price = 34.99,
        image_url = 'https://i.imgur.com/527O9bM.jpg',
        description = 'Walk it Like I talk it Lamp. The walking human lamp that can pose for pictures!'
    )

    product10 = Product(
        user_id = 1,
        name = 'The Organ LunchBox',
        model = 'S04192',
        category = "Kitchen & Dining",
        price = 16.99,
        image_url = 'https://i.imgur.com/PMDbqYM.jpg',
        description = 'Feeling HANGRY? Take your food in this portable Human Organ Lunchbox...'
    )

    product11 = Product(
        user_id = 1,
        name = 'Covid-19 Waldo',
        model = 'S32132',
        category = "Books",
        price = 17.99,
        image_url = 'https://i.imgur.com/d0s94U4.jpg',
        description = 'Remember when finding Waldo was the hardest thing to do? Try this one out!'
    )

    product12 = Product(
        user_id = 1,
        name = 'New England Listerine',
        model = 'S31241',
        category = "Beauty & Product",
        price = 18.99,
        image_url = 'https://i.imgur.com/TaecdJH.png',
        description = 'In a rush? Gurgle with the New England Clam Chowder Antiseptic mouthwash. Breakfast included in the bottle.'
    )

    product13 = Product(
        user_id = 1,
        name = 'Yodel-Ay Pickle',
        model = 'S48382',
        category = "Toys",
        price = 8.99,
        image_url = 'https://i.imgur.com/UBCiyWi.jpg',
        description = 'A singing pickle...'
    )
    product14 = Product(
        user_id = 1,
        name = 'My First Kiss',
        model = 'S01292',
        category = "Toys",
        price = 5.99,
        image_url = 'https://i.imgur.com/E4ip5ah.jpg',
        description = 'Product is self-explanatory. Think what you would like.'
    )

    product15 = Product(
        user_id = 1,
        name = 'DinoChickenaurus arm',
        model = 'S54232',
        category = "Pets",
        price = 5.99,
        image_url = 'https://i.imgur.com/6hrP1d4.jpg',
        description = 'Need help carrying eggs? This arm addition may help!'
    )

    product16 = Product(
        user_id = 1,
        name = 'Avocado Toast Crunch',
        model = 'S01032',
        category = "Groceries",
        price = 6.99,
        image_url = 'https://i.imgur.com/AWgtOXE.jpg',
        description = 'Introducing the New Cinnamon Toast Crunch but healthier with more proteins!'
    )

    product17 = Product(
        user_id = 1,
        name = 'Swedish Fish Flavor Cream Oreo',
        model = 'S91918',
        category = "Groceries",
        price = 7.99,
        image_url = 'https://i.imgur.com/flWRYqN.jpg',
        description = 'Limited Edition- Swedish Fish Flavor cream Oreo. Eat two junk foods at one time.'
    )

    product18 = Product(
        user_id = 1,
        name = 'Watermelon Flavor Creme Oreo',
        model = 'S92131',
        category = "Groceries",
        price = 7.99,
        image_url = 'https://i.imgur.com/QpgaEQ0.jpg',
        description = 'Limited Edition- Swedish Fish Flavor cream Oreo. Eat semi-healthy.'
    )

    product19 = Product(
        user_id = 1,
        name = 'The "What Am I Wiping With?" Toilet Paper',
        model = 'S92140',
        category = "Beauty & Product",
        price = 14.99,
        image_url = 'https://i.imgur.com/idNmyXT.png',
        description = 'The toilet paper without stains. Wipe and hope for the best!'
    )
    
    product20 = Product(
        user_id = 1,
        name = 'Snot Dispenser',
        model = 'S22321',
        category = "Appliances",
        price = 15.99,
        image_url = 'https://i.imgur.com/k7PhxGH.jpg',
        description = 'Don"t be nosy, be cosy! Fill your Shampoo, Conditioner, or Body Wash in the Snot Dispenser and let it drip!'
    )

    product21 = Product(
        user_id = 1,
        name = 'Thanos One Piece',
        model = 'S29491',
        category = "Clothing",
        price = 12.99,
        image_url = 'https://i.imgur.com/pyLkcKe.jpg',
        description = 'Feel Powerful with the Thanos One Piece. Flick once and watch what happens...'
    )


    products = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12, product13, product14, product15, product16, product17, product18, product19, product20, product21]

    [db.session.add(product) for product in products]
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
