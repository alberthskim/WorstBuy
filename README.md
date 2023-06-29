# WorstBuy

<img src="https://i.imgur.com/2GHX5H6.png">

Welcome to WorstBuy! Worstbuy is a fullstack application clone, inspired by a mixture of Bestbuy and Target. Create a user, add items to the cart, add some reviews, and shop for some of the "worst" products you can buy!

Live site: https://worstbuy.onrender.com/

## Overview

App Academy January 2023 Cohort

This is my second solo project and my capstone project. In order to graduate, I needed to create two full CRUD features. I chose my two features to be the ability to create, read, update, and delete for reviews and for cart.

Throughout this process, I learned many new skills and gained a better understanding of Python and React/Redux throughout this process.

- In the beginning of the project, I was querying my routes for the things I needed in my get All Products Route instead of utilizing Python's full potential of creating relationships. I didn't utilize Python's relationship in the models as I should have.
- My state management for some of my features changed throughout my project as in the beginning, I tried to use one thunk to grab everything I needed. I learned that this method is not great as it would send a fetch request to my backend database for information that I did not need. As I started to understand and learn more, I was able to use my redux store state properly.
- I learned that planning is very important before starting a whole project. When starting a new project, having a game plan to execute is needed in order to finish strong! 💪🏻


## Wiki Links
- [API Documentation](https://github.com/alberthskim/WorstBuy/wiki/Api-Documentation)
- [Database Schema](https://github.com/alberthskim/WorstBuy/wiki/Database-Schema)
- [Feature List](https://github.com/alberthskim/WorstBuy/wiki/Feature-List)
- [User Stories](https://github.com/alberthskim/WorstBuy/wiki/User-Stories)
- [WorstBuy WireFrame](https://github.com/alberthskim/WorstBuy/wiki/WorstBuy-WireFrame)


## Technologies Used
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

Other
- Imgur
- Paint.js
- Photopea

## Future Project Goals

- Implement more features and additionals to project:
    - Full CRUD for Products (Admin Access only)
    - Full CRUD for Saved Items
    - Implement AWS for picture adding
    - Search Bar for finding products
    - Category Tabs for finding products according to       product type
    - Implement a Google API for grabbing nearest stores
    - Implement to add comments to reviews
    - Implement a helpful/unhelpful button
    - Implement an automated bot for helping users with question
    - For non-logged in users, add the ability to still add items to the cart
    - A checkout page where users can get a real life feeling of checking out products.
    - Refactor my code to make it easier for others to read
    - More CSS!
    - TO NEVER STOP LEARNING!!!


## Meet The Developer
- Albert Kim
<img src="https://i.imgur.com/YxvVUbL.png" width=20> [LinkedIn](https://www.linkedin.com/in/albertkim01/") <img src="https://i.imgur.com/e3EquH6.png" width=20> [GitHub](https://github.com/alberthskim)





<!-- This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/ -->
