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
        value = 0,
        quality = 0,
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
        value = 0,
        quality = 0,
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

    review15 = Review(
        user_id = 2,
        product_id = 7,
        rating = 3,
        review_content = "A pet rock that doesn't even talk back to me... I'm still lonely.",
        title = 'Why??',
        value = 1,
        quality = 1,
        purchased = 'True',
        recommendation = 'False',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review16 = Review(
        user_id = 3,
        product_id = 8,
        rating = 4,
        review_content = "My childhood characters in a book! It slightly ruined my childhood life slightly but still a funny book. Would recommend!",
        title = 'My ChildHood!!!!',
        value = 4,
        quality = 4,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review17 = Review(
        user_id = 4,
        product_id = 9,
        rating = 5,
        review_content = "Put a baseball cap on my lamp and gave it a slight rap pose... Looking DOPE!",
        title = 'WALK IT LIKE I TALK IT!',
        value = 4,
        quality = 5,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'BobbieSMURDA',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review18 = Review(
        user_id = 2,
        product_id = 10,
        rating = 4,
        review_content = "Took this lunch box to my hospital shift and my preceptor REALLY thought I was really transferring organs... Funny but embarrassing.",
        title = 'Funny but embarrassing...',
        value = 4,
        quality = 5,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review19 = Review(
        user_id = 3,
        product_id = 11,
        rating = 4,
        review_content = "I bring it wherever I go to make people laugh. Other than that, the book is super easy and slightly boring...",
        title = 'Another Childhood book!',
        value = 3,
        quality = 5,
        purchased = 'True',
        recommendation = 'False',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review20 = Review(
        user_id = 2,
        product_id = 12,
        rating = 5,
        review_content = "Definitely a quick an easy way to walk out the door while having breakfast!",
        title = 'YUMZZZ',
        value = 5,
        quality = 5,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review21 = Review(
        user_id = 4,
        product_id = 13,
        rating = 4,
        review_content = "Heard that this pickle can rap! I'm going to get one from the store.",
        title = 'YOOOO TIMZ THE PICKLE',
        value = 0,
        quality = 0,
        purchased = 'False',
        recommendation = 'True',
        display_name = 'BobbieSMURDA',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review22 = Review(
        user_id = 3,
        product_id = 14,
        rating = 5,
        review_content = "I recently got a boyfriend and was told I was a great kisser! It was my first time too!",
        title = 'My First Kiss Went A Little Like This...',
        value = 5,
        quality = 5,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review23 = Review(
        user_id = 2,
        product_id = 15,
        rating = 3,
        review_content = "I put this arm on my pet chicken and in a day, one arm broke fell off. The sight of seeing my chicken run towards me with one arm was pretty darn scary.",
        title = 'Robo Chicken For real',
        value = 3,
        quality = 2,
        purchased = 'True',
        recommendation = 'False',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review24 = Review(
        user_id = 2,
        product_id = 16,
        rating = 2,
        review_content = "I'm usually an avocado person but this isn't it. If you really love avocado, maybe you'll like it.",
        title = 'Worth a try... but NAH',
        value = 2,
        quality = 1,
        purchased = 'True',
        recommendation = 'False',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review25 = Review(
        user_id = 3,
        product_id = 17,
        rating = 5,
        review_content = "This combo is so delicious! HIGHLY RECOMMEND TRYING IT. You will not be disappointed.",
        title = 'I LOVE IT!!!',
        value = 5,
        quality = 5,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review26 = Review(
        user_id = 3,
        product_id = 18,
        rating = 4,
        review_content = "It's not bad but I prefer the Swedish fish one instead.",
        title = 'Great but not as great as the swedish fish one',
        value = 4,
        quality = 4,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review27 = Review(
        user_id = 2,
        product_id = 18,
        rating = 5,
        review_content = "I really want to try it but can't find it anywhere near me...",
        title = "SOMEONE PLEASE BUY ONE FOR ME!",
        value = 0,
        quality = 0,
        purchased = 'False',
        recommendation = 'True',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review28 = Review(
        user_id = 3,
        product_id = 19,
        rating = 5,
        review_content = "Great quality and kinda interesting... Try it out and let me know what ya'll think.",
        title = "Cool and interesting",
        value = 3,
        quality = 5,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'MarnBarn123',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review29 = Review(
        user_id = 4,
        product_id = 20,
        rating = 5,
        review_content = "Punch it on the nose and drip drip goes the shampooooooo",
        title = "LOVE IT!!",
        value = 5,
        quality = 3,
        purchased = 'True',
        recommendation = 'True',
        display_name = 'BobbieSMURDA',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    review30 = Review(
        user_id = 2,
        product_id = 21,
        rating = 3,
        review_content = "Wear this is public and become a laughing stock. If you can take the embarrassment, go for it!",
        title = "AVENGERS ASSEMBLE",
        value = 4,
        quality = 5,
        purchased = 'True',
        recommendation = 'False',
        display_name = 'Demz',
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,5,1))
    )

    reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13, review14, review15, review16, review17, review18, review19, review20, review21, review22, review23, review24, review25, review26, review27, review28, review29, review30]

    [db.session.add(review) for review in reviews]
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
