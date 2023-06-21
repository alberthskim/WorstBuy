from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta
from random import randint

def random_date(start, end):
    """Generate a random datetime between `start` and `end` which
    should be datetime objects"""
    random_date = start + timedelta(
        # Get a random amount of seconds between `start` and `end`
        seconds = randint(0, int((end - start).total_seconds())),
    )
    return random_date

def seed_reviews():
    review1 = Review(
        user_id = 2,
        product_id = 1,
        rating = 5,
        review_content = "Awesome Door Stopper! I felt so evil putting a picture on it 😈",
        title = 'Haters Gon Hate',
        value = 5,
        quality = 5,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review2 = Review(
        user_id = 2,
        product_id = 2,
        rating = 3,
        review_content = "Comfortable but kinda silly to wear in public. Great PJs",
        title = "It's Okay...",
        value = 4,
        quality = 5,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review3 = Review(
        user_id = 2,
        product_id = 3,
        rating = 1,
        review_content = "I don't get what the purpose of this product is",
        title = 'BRUH...',
        value = 3,
        quality = 2,
        purchased = 'True',
        recommendation = 'False',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review4 = Review(
        user_id = 2,
        product_id = 4,
        rating = 4,
        review_content = "All My friends think this is funny!",
        title = 'BAK BAK GOOSE',
        value = 5,
        quality = 4,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review5 = Review(
        user_id = 2,
        product_id = 5,
        rating = 4,
        review_content = "Super Bulky but very easy to hold my phone now.",
        title = 'Hand Ova The Drumsticks',
        value = 4,
        quality = 3,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review6 = Review(
        user_id = 2,
        product_id = 6,
        rating = 4,
        review_content = "I don't have kids but this looks kinda cool.",
        title = 'Tezzy Box Diapers',
        purchased = 'False',
        recommendation = 'True',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review7 = Review(
        user_id = 3,
        product_id = 1,
        rating = 2,
        review_content = "Cool design but doesn't hold my door. The product also doesn't look like what I received",
        title = 'The Human Door Stopper',
        review_url = 'https://i.imgur.com/D5qXTpS.jpg',
        value = 2,
        quality = 3,
        purchased = 'True',
        recommendation = 'False',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review8 = Review(
        user_id = 3,
        product_id = 2,
        rating = 5,
        review_content = "Lovin' the styles!",
        title = 'Noodle Legs',
        value = 5,
        quality = 5,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review9 = Review(
        user_id = 3,
        product_id = 3,
        rating = 1,
        review_content = "I thought it was a kitchen knife...",
        title = "Don't Purchase!!!",
        value = 1,
        quality = 1,
        purchased = 'True',
        recommendation = 'False',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review10 = Review(
        user_id = 3,
        product_id = 4,
        rating = 3,
        review_content = "Nice Keychain but wish it made sounds when squishing the belly",
        title = 'Could use some more features',
        value = 4,
        quality = 4,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review11 = Review(
        user_id = 3,
        product_id = 5,
        rating = 5,
        review_content = "Haven't purchased yet but looking to add it to my saved items",
        title = 'I WANT PLEASEEE',
        purchased = 'False',
        recommendation = 'True',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review12 = Review(
        user_id = 3,
        product_id = 6,
        rating = 5,
        review_content = "I know my baby is gonna have no back problems. The bottom of the diaper forces my kid to sit up straight.",
        title = 'Back Posture helper',
        value = 5,
        quality = 5,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review13 = Review(
        user_id = 4,
        product_id = 1,
        rating = 4,
        review_content = "Not Bad...",
        title = "It's cool",
        value = 4,
        quality = 4,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'BobbieSMURDA',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review14 = Review(
        user_id = 4,
        product_id = 2,
        rating = 5,
        review_content = "COOLIO",
        title = 'RAH Pants',
        value = 5,
        quality = 5,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'BobbieSMURDA',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )


    reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13, review14]

    [db.session.add(review) for review in reviews]
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
