# Guide Finder

## Full Stack React, Redux-Toolkit, Python, PostgreSQL, AWS S3 App

## Introduction

This is a full-stack built with React, Redux-Toolkit, Python, PostgreSQL and AWS S3. The application features user authentication, which allows users to login, sign-up, logout, and use a demo user login for easy access. 

The frontend was built with React, Redux-Toolkit (with normalized data), and CSS. The backend was built with Python, PostgreSQL and the AWS S3 buckets for image upload.

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the **.env** file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db migrate -m "some message" #(only if need new migrations)
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

7. The React frontend has no styling applied. Copy the **.css** files from your
   Authenticate Me project into the corresponding locations in the
   **react-vite** folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the **react-vite**
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the **dist**
   folder whenever you change your code, keeping the production version up to
   date.

## Deployment through Render.com

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the **dist** folder located in
the root of your **react-vite** folder when you push to GitHub. This **dist**
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your **react-vite** folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the **Dockerfile**, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a **.env** file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA=«custom_schema_name_here»
- AWS_BUCKET_NAME=«aws_bucket_name_here»
- AWS_BUCKET_REGION=«aws_bucket_region_here»
- AWS_ACCESS_KEY_ID=«aws_access_key_here»
- AWS_SECRET_ACCESS_KEY=«aws_secret_access_key_here»

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

Assign PORT to 8000, choose a custom schema in snake case, and generate a strong JWT secret.

- Recommendation to generate a strong secret: create a random string using openssl (a library that should already be installed in your Ubuntu/MacOS shell). Run openssl rand -base64 to generate a random JWT secret.

For the AWS required variables, you can access those directly from the AWS bucket you set up.

**Note:** Add any other keys and values that may be present in your local
**.env** file. As you work to further develop your project, you may need to add
more environment variables to your local **.env** file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

## Database Schema Design

![alt text](image.png)

## API Documentation

#### OVERVIEW:
### User Management
- Sign Up a User
- Login a User
- Logout a User
- Update a User
- Delete a User
- Get User Details
- Get All Users
- Create a User (Manager only)
- Update a User (Manager only)
- Delete a User (Manager only)

### Guide Management
- Sign Up a Guide
- Update a Guide
- Delete a Guide
- Get Guide Details
- Get All Guides

### Service Management
- Create a Service
- Update a Service
- Delete a Service
- Get Service Details
- Get All Services
- Search Services

### Booking Management
- Create a Booking
- Update a Booking
- Delete a Booking
- Get Booking Details
- Get All Bookings
- Get User Bookings
- Get Guide Bookings
- Get All Bookings for a Service

### Gallery Management
- Add an Image to the Gallery
- Delete an Image from the Gallery
- Get Image Details
- Get All Images

### Reviews Management
- Create a Review
- Update a Review
- Delete a Review
- Get Review Details
- Get All Reviews
- Get All Reviews for a User

### Direct Messaging
- Send a Message
- Delete a Message
- Get All Messages in a Conversation
- Get All Conversations for a User
- Get All Conversations for a Guide

### User Profile Management
- Update User Profile

### Authentication Management
- Logout a User

## STAFF / CLIENT / GUIDE AUTHENTICATION OR AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current staff/client to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - content-Type: application/json
  - Body:

  ```json
  {
    "message": "Authentication required"
  }
  ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current staff / client does not have the correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "Forbidden"
  }
  ```

### User Management

## User Management

#### Sign Up a User

Creates a new User and returns the User's information.

- Require Authentication: false
- Request:

  - Method: POST
  - Route path: /api/auth/signup
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith",
      "password": "secret password",
      "is_manager": false
    }
    ```

- Success Response:

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user_id": 1,
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith",
      "is_manager": false
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "email": "Email is already in use"
      }
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Login a User

Logs in a User and returns the User's information along with a token.

- Require Authentication: false
- Request:

  - Method: POST
  - Route path: /api/auth/login
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user_id": 1,
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith",
      "is_manager": false,
      "token": "jwt_token_here"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid email or password"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Logout a User

Logs out a User and invalidates the session token.

- Require Authentication: true
- Request:

  - Method: POST
  - Route path: /api/auth/logout
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully logged out"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Update a User

Updates and returns an existing User.

- Require Authentication: true
- Request:

  - Method: PUT
  - Route path: /api/users/:user_id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith",
      "password": "secret password",
      "is_manager": false
    }
    ```

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user_id": 1,
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith",
      "is_manager": false
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "email": "Email is already in use"
      }
    }
    ```

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Delete a User

Deletes an existing User.

- Require Authentication: true
- Request:

  - Method: DELETE
  - Route path: /api/users/:user_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User successfully deleted"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get User Details

Returns the details of a specific User.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/users/:user_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user_id": 1,
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith",
      "is_manager": false
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Users

Returns all Users.

- Require Authentication: true (Manager only)
- Request:

  - Method: GET
  - Route path: /api/users
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "user_id": 1,
        "firstname": "John",
        "lastname": "Smith",
        "email": "john.smith@gmail.com",
        "phone_num": "123-456-7891",
        "address": "123 main st",
        "city": "redlands",
        "state": "CA",
        "zip": 92323,
        "username": "JohnSmith",
        "is_manager": false
      },
      {
        "user_id": 2,
        "firstname": "Jane",
        "lastname": "Doe",
        "email": "jane.doe@gmail.com",
        "phone_num": "987-654-3210",
        "address": "456 another st",
        "city": "somewhere",
        "state": "NY",
        "zip": 12345,
        "username": "JaneDoe",
        "is_manager": true
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

### User Profile Management

#### Update User Profile

Updates the profile information of the logged-in User.

- Require Authentication: true
- Request:

  - Method: PUT
  - Route path: /api/users/profile
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith"
    }
    ```

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user_id": 1,
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith"
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "email": "Email is already in use"
      }
    }
    ```

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Create a User (Manager only)

Creates a new User and returns the User's information.

- Require Authentication: true (Manager only)
- Request:

  - Method: POST
  - Route path: /api/users
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith",
      "password": "secret password",
      "is_manager": false
    }
    ```

- Success Response:

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user_id": 1,
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith",
      "is_manager": false
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "email": "Email is already in use"
      }
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Update a User (Manager only)

Updates and returns an existing User.

- Require Authentication: true (Manager only)
- Request:

  - Method: PUT
  - Route path: /api/users/:user_id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith",
      "password": "secret password",
      "is_manager": false
    }
    ```

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user_id": 1,
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@gmail.com",
      "phone_num": "123-456-7891",
      "address": "123 main st",
      "city": "redlands",
      "state": "CA",
      "zip": 92323,
      "username": "JohnSmith",
      "is_manager": false
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "email": "Email is already in use"
      }
    }
    ```

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Delete a User (Manager only)

Deletes an existing User.

- Require Authentication: true (Manager only)
- Request:

  - Method: DELETE
  - Route path: /api/users/:user_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User successfully deleted"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

  ### Guide Management

#### Sign Up a Guide

Creates a new Guide and returns the Guide's information.

- Require Authentication: false
- Request:

  - Method: POST
  - Route path: /api/auth/guide/signup
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstname": "Jane",
      "lastname": "Doe",
      "email": "jane.doe@gmail.com",
      "phone_num": "987-654-3210",
      "address": "456 another st",
      "city": "somewhere",
      "state": "NY",
      "zip": 12345,
      "businessname": "Jane's Guide Service",
      "insurance_provider_name": "Insurance Co",
      "insurance_number": 123456789,
      "services": "Hiking, Camping",
      "username": "JaneDoe",
      "password": "another password"
    }
    ```

- Success Response:

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "guide_id": 1,
      "firstname": "Jane",
      "lastname": "Doe",
      "email": "jane.doe@gmail.com",
      "phone_num": "987-654-3210",
      "address": "456 another st",
      "city": "somewhere",
      "state": "NY",
      "zip": 12345,
      "businessname": "Jane's Guide Service",
      "insurance_provider_name": "Insurance Co",
      "insurance_number": 123456789,
      "services": "Hiking, Camping",
      "username": "JaneDoe"
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "email": "Email is already in use"
      }
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Update a Guide

Updates and returns an existing Guide.

- Require Authentication: true
- Require Authorization: true (Manager or Guide)
- Request:

  - Method: PUT
  - Route path: /api/guides/:guide_id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstname": "Jane",
      "lastname": "Doe",
      "email": "jane.doe@gmail.com",
      "phone_num": "987-654-3210",
      "address": "456 another st",
      "city": "somewhere",
      "state": "NY",
      "zip": 12345,
      "businessname": "Jane's Guide Service",
      "insurance_provider_name": "Insurance Co",
      "insurance_number": 123456789,
      "services": "Hiking, Camping",
      "username": "JaneDoe",
      "password": "another password"
    }
    ```

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "guide_id": 1,
      "firstname": "Jane",
      "lastname": "Doe",
      "email": "jane.doe@gmail.com",
      "phone_num": "987-654-3210",
      "address": "456 another st",
      "city": "somewhere",
      "state": "NY",
      "zip": 12345,
      "businessname": "Jane's Guide Service",
      "insurance_provider_name": "Insurance Co",
      "insurance_number": 123456789,
      "services": "Hiking, Camping",
      "username": "JaneDoe"
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "email": "Email is already in use"
      }
    }
    ```

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Guide not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Delete a Guide

Deletes an existing Guide.

- Require Authentication: true
- Require Authorization: true (Manager)
- Request:

  - Method: DELETE
  - Route path: /api/guides/:guide_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Guide successfully deleted"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Guide not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get Guide Details

Returns the details of a specific Guide.

- Require Authentication: true
- Require Authorization: true (Manager or Guide)
- Request:

  - Method: GET
  - Route path: /api/guides/:guide_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "guide_id": 1,
      "firstname": "Jane",
      "lastname": "Doe",
      "email": "jane.doe@gmail.com",
      "phone_num": "987-654-3210",
      "address": "456 another st",
      "city": "somewhere",
      "state": "NY",
      "zip": 12345,
      "businessname": "Jane's Guide Service",
      "insurance_provider_name": "Insurance Co",
      "insurance_number": 123456789,
      "services": "Hiking, Camping",
      "username": "JaneDoe"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Guide not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Guides

Returns all Guides.

- Require Authentication: true
- Require Authorization: true (Manager)
- Request:

  - Method: GET
  - Route path: /api/guides
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "guide_id": 1,
        "firstname": "Jane",
        "lastname": "Doe",
        "email": "jane.doe@gmail.com",
        "phone_num": "987-654-3210",
        "address": "456 another st",
        "city": "somewhere",
        "state": "NY",
        "zip": 12345,
        "businessname": "Jane's Guide Service",
        "insurance_provider_name": "Insurance Co",
        "insurance_number": 123456789,
        "services": "Hiking, Camping",
        "username": "JaneDoe"
      },
      {
        "guide_id": 2,
        "firstname": "John",
        "lastname": "Smith",
        "email": "john.smith@gmail.com",
        "phone_num": "123-456-7891",
        "address": "123 main st",
        "city": "redlands",
        "state": "CA",
        "zip": 92323,
        "businessname": "John's Guide Service",
        "insurance_provider_name": "Insurance Co",
        "insurance_number": 987654321,
        "services": "Fishing, Boating",
        "username": "JohnSmith"
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```


### Service Management

#### Create a Service

Creates and returns a new Service.

- Require Authentication: true
- Require Authorization: true (Guide or Manager)
- Request:

  - Method: POST
  - Route path: /api/services
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "guide_id": 1,
      "type": "Hiking",
      "location": "Mountain Trail",
      "description": "A beautiful hike through the mountains.",
      "cost": 100,
      "images": "http://example.com/image.jpg",
      "reviews": "Great experience!"
    }
    ```

- Success Response:

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "service_id": 1,
      "guide_id": 1,
      "type": "Hiking",
      "location": "Mountain Trail",
      "description": "A beautiful hike through the mountains.",
      "cost": 100,
      "images": "http://example.com/image.jpg",
      "reviews": "Great experience!"
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "type": "Type is required",
        "location": "Location is required",
        "description": "Description is required",
        "cost": "Cost is required"
      }
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Update a Service

Updates and returns an existing Service.

- Require Authentication: true
- Require Authorization: true (Guide or Manager)
- Request:

  - Method: PUT
  - Route path: /api/services/:service_id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "guide_id": 1,
      "type": "Hiking",
      "location": "Mountain Trail",
      "description": "A beautiful hike through the mountains.",
      "cost": 100,
      "images": "http://example.com/image.jpg",
      "reviews": "Great experience!"
    }
    ```

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "service_id": 1,
      "guide_id": 1,
      "type": "Hiking",
      "location": "Mountain Trail",
      "description": "A beautiful hike through the mountains.",
      "cost": 100,
      "images": "http://example.com/image.jpg",
      "reviews": "Great experience!"
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "type": "Type is required",
        "location": "Location is required",
        "description": "Description is required",
        "cost": "Cost is required"
      }
    }
    ```

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Service not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Delete a Service

Deletes an existing Service.

- Require Authentication: true
- Require Authorization: true (Guide or Manager)
- Request:

  - Method: DELETE
  - Route path: /api/services/:service_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Service successfully deleted"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Service not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get Service Details

Returns the details of a specific Service.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/services/:service_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "service_id": 1,
      "guide_id": 1,
      "type": "Hiking",
      "location": "Mountain Trail",
      "description": "A beautiful hike through the mountains.",
      "cost": 100,
      "images": "http://example.com/image.jpg",
      "reviews": "Great experience!"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Service not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Services

Returns all Services.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/services
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "service_id": 1,
        "guide_id": 1,
        "type": "Hiking",
        "location": "Mountain Trail",
        "description": "A beautiful hike through the mountains.",
        "cost": 100,
        "images": "http://example.com/image.jpg",
        "reviews": "Great experience!"
      },
      {
        "service_id": 2,
        "guide_id": 2,
        "type": "Camping",
        "location": "Forest Camp",
        "description": "An adventurous camping experience.",
        "cost": 150,
        "images": "http://example.com/image2.jpg",
        "reviews": "Amazing camping!"
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Search Services

Allows users to search for services by name or activity name, and filter by location, activity type, experience level, and cost.

- Require Authentication: false
- Request:

  - Method: GET
  - Route path: /api/services/search
  - Headers:
    - Content-Type: application/json
  - Query Parameters:
    - `name` (optional): The name of the service or activity.
    - `state` (optional): The state where the service is located.
    - `country` (optional): The country where the service is located.
    - `activity_type` (optional): The type of activity (e.g., Hiking, Camping).
    - `experience_level` (optional): The experience level required (e.g., Beginner, Intermediate, Advanced).
    - `min_cost` (optional): The minimum cost of the service.
    - `max_cost` (optional): The maximum cost of the service.

- Example Request:

  ```http
  GET /api/services/search?name=Hiking&state=CA&activity_type=Hiking&experience_level=Intermediate&min_cost=50&max_cost=200


### Booking Management

#### Create a Booking

Creates and returns a new Booking.

- Require Authentication: true
- Require Authorization: true (User, Guide, or Manager)
- Request:

  - Method: POST
  - Route path: /api/bookings
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "client_id": 1,
      "service_id": 1,
      "start_date": "2024-12-10T08:00:00",
      "end_date": "2024-12-10T18:00:00",
      "cost": 100
    }
    ```

- Success Response:

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "booking_id": 1,
      "client_id": 1,
      "service_id": 1,
      "start_date": "2024-12-10T08:00:00",
      "end_date": "2024-12-10T18:00:00",
      "cost": 100
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "client_id": "Client ID is required",
        "service_id": "Service ID is required",
        "start_date": "Start date is required",
        "end_date": "End date is required",
        "cost": "Cost is required"
      }
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Update a Booking

Updates and returns an existing Booking.

- Require Authentication: true
- Require Authorization: true (User, Guide, or Manager)
- Request:

  - Method: PUT
  - Route path: /api/bookings/:booking_id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "client_id": 1,
      "service_id": 1,
      "start_date": "2024-12-10T08:00:00",
      "end_date": "2024-12-10T18:00:00",
      "cost": 100
    }
    ```

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "booking_id": 1,
      "client_id": 1,
      "service_id": 1,
      "start_date": "2024-12-10T08:00:00",
      "end_date": "2024-12-10T18:00:00",
      "cost": 100
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "client_id": "Client ID is required",
        "service_id": "Service ID is required",
        "start_date": "Start date is required",
        "end_date": "End date is required",
        "cost": "Cost is required"
      }
    }
    ```

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Booking not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Delete a Booking

Deletes an existing Booking.

- Require Authentication: true
- Require Authorization: true (User, Guide, or Manager)
- Request:

  - Method: DELETE
  - Route path: /api/bookings/:booking_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Booking successfully deleted"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Booking not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get Booking Details

Returns the details of a specific Booking.

- Require Authentication: true
- Require Authorization: true (User, Guide, or Manager)
- Request:

  - Method: GET
  - Route path: /api/bookings/:booking_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "booking_id": 1,
      "client_id": 1,
      "service_id": 1,
      "start_date": "2024-12-10T08:00:00",
      "end_date": "2024-12-10T18:00:00",
      "cost": 100
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Booking not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Bookings

Returns all Bookings.

- Require Authentication: true
- Require Authorization: true (Manager)
- Request:

  - Method: GET
  - Route path: /api/bookings
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "booking_id": 1,
        "client_id": 1,
        "service_id": 1,
        "start_date": "2024-12-10T08:00:00",
        "end_date": "2024-12-10T18:00:00",
        "cost": 100
      },
      {
        "booking_id": 2,
        "client_id": 2,
        "service_id": 2,
        "start_date": "2024-12-11T08:00:00",
        "end_date": "2024-12-11T18:00:00",
        "cost": 150
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get User Bookings

Returns all Bookings associated with a specific User.

- Require Authentication: true
- Require Authorization: true (User or Manager)
- Request:

  - Method: GET
  - Route path: /api/bookings/user/:user_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "booking_id": 1,
        "client_id": 1,
        "service_id": 1,
        "start_date": "2024-12-10T08:00:00",
        "end_date": "2024-12-10T18:00:00",
        "cost": 100
      },
      {
        "booking_id": 2,
        "client_id": 1,
        "service_id": 2,
        "start_date": "2024-12-11T08:00:00",
        "end_date": "2024-12-11T18:00:00",
        "cost": 150
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get Guide Bookings

Returns all Bookings associated with a specific Guide.

- Require Authentication: true
- Require Authorization: true (Guide or Manager)
- Request:

  - Method: GET
  - Route path: /api/bookings/guide/:guide_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "booking_id": 1,
        "client_id": 1,
        "service_id": 1,
        "start_date": "2024-12-10T08:00:00",
        "end_date": "2024-12-10T18:00:00",
        "cost": 100
      },
      {
        "booking_id": 2,
        "client_id": 2,
        "service_id": 1,
        "start_date": "2024-12-11T08:00:00",
        "end_date": "2024-12-11T18:00:00",
        "cost": 150
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Guide not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Bookings for a Service

Returns all Bookings associated with a specific Service.

- Require Authentication: true
- Require Authorization: true (Guide or Manager)
- Request:

  - Method: GET
  - Route path: /api/bookings/service/:service_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "booking_id": 1,
        "client_id": 1,
        "service_id": 1,
        "start_date": "2024-12-10T08:00:00",
        "end_date": "2024-12-10T18:00:00",
        "cost": 100
      },
      {
        "booking_id": 2,
        "client_id": 2,
        "service_id": 1,
        "start_date": "2024-12-11T08:00:00",
        "end_date": "2024-12-11T18:00:00",
        "cost": 150
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Service not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```


 ### Gallery Management

#### Add an Image to the Gallery

Creates and returns a new Image for a Service or User.

- Require Authentication: true
- Require Authorization: true (User, Guide, or Manager)
- Request:

  - Method: POST
  - Route path: /api/gallery
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "service_id": 1,
      "user_id": 1,
      "image": "http://example.com/image.jpg"
    }
    ```

- Success Response:

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "image_id": 1,
      "service_id": 1,
      "user_id": 1,
      "image": "http://example.com/image.jpg"
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "service_id": "Service ID is required",
        "user_id": "User ID is required",
        "image": "Image URL is required"
      }
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Delete an Image from the Gallery

Deletes an existing Image for a Service or User.

- Require Authentication: true
- Require Authorization: true (User or Manager)
- Request:

  - Method: DELETE
  - Route path: /api/gallery/:image_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Image successfully deleted"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Image not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get Image Details

Returns the details of a specific Image in the Gallery.

- Require Authentication: true
- Require Authorization: true (User, Guide, or Manager)
- Request:

  - Method: GET
  - Route path: /api/gallery/:image_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "image_id": 1,
      "service_id": 1,
      "user_id": 1,
      "image": "http://example.com/image.jpg"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Image not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Images

Returns all Images in the Gallery.

- Require Authentication: true
- Require Authorization: true (User, Guide, or Manager)
- Request:

  - Method: GET
  - Route path: /api/gallery
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "image_id": 1,
        "service_id": 1,
        "user_id": 1,
        "image": "http://example.com/image.jpg"
      },
      {
        "image_id": 2,
        "service_id": 2,
        "user_id": 2,
        "image": "http://example.com/image2.jpg"
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```


### Reviews Management

#### Create a Review

Creates and returns a new Review for a Service.

- Require Authentication: true
- Require Authorization: true (User)
- Request:

  - Method: POST
  - Route path: /api/reviews
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "service_id": 1,
      "user_id": 1,
      "review": "This was an amazing experience!"
    }
    ```

- Success Response:

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "review_id": 1,
      "service_id": 1,
      "user_id": 1,
      "review": "This was an amazing experience!"
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "service_id": "Service ID is required",
        "user_id": "User ID is required",
        "review": "Review is required"
      }
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Update a Review

Updates and returns an existing Review.

- Require Authentication: true
- Require Authorization: true (User)
- Request:

  - Method: PUT
  - Route path: /api/reviews/:review_id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "service_id": 1,
      "user_id": 1,
      "review": "This was an amazing experience!"
    }
    ```

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "review_id": 1,
      "service_id": 1,
      "user_id": 1,
      "review": "This was an amazing experience!"
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "service_id": "Service ID is required",
        "user_id": "User ID is required",
        "review": "Review is required"
      }
    }
    ```

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Delete a Review

Deletes an existing Review.

- Require Authentication: true
- Require Authorization: true (User or Manager)
- Request:

  - Method: DELETE
  - Route path: /api/reviews/:review_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review successfully deleted"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get Review Details

Returns the details of a specific Review.

- Require Authentication: true
- Require Authorization: true (User or Manager)
- Request:

  - Method: GET
  - Route path: /api/reviews/:review_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "review_id": 1,
      "service_id": 1,
      "user_id": 1,
      "review": "This was an amazing experience!"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Reviews

Returns all Reviews for a specific Service.

- Require Authentication: true
- Require Authorization: true (User or Manager)
- Request:

  - Method: GET
  - Route path: /api/reviews/service/:service_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "review_id": 1,
        "service_id": 1,
        "user_id": 1,
        "review": "This was an amazing experience!"
      },
      {
        "review_id": 2,
        "service_id": 1,
        "user_id": 2,
        "review": "Had a great time!"
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Service not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

### Direct Messaging

#### Send a Message

Creates and returns a new Message in a conversation.

- Require Authentication: true
- Require Authorization: true (User, Guide, or Manager)
- Request:

  - Method: POST
  - Route path: /api/messages
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user_id": 1,
      "guide_id": 1,
      "message": "Hello, I have a question about your service."
    }
    ```

- Success Response:

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message_id": 1,
      "user_id": 1,
      "guide_id": 1,
      "message": "Hello, I have a question about your service.",
      "timestamp": "2024-12-10T08:00:00Z"
    }
    ```

- Error Responses:

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "errors": {
        "user_id": "User ID is required",
        "guide_id": "Guide ID is required",
        "message": "Message is required"
      }
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Delete a Message

Deletes an existing Message in a conversation.

- Require Authentication: true
- Require Authorization: true (User, Guide, or Manager)
- Request:

  - Method: DELETE
  - Route path: /api/messages/:message_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Message successfully deleted"
    }
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Message not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Messages in a Conversation

Returns all messages in a specific conversation.

- Require Authentication: true
- Require Authorization: true (User, Guide, or Manager)
- Request:

  - Method: GET
  - Route path: /api/messages/conversation/:conversation_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "message_id": 1,
        "user_id": 1,
        "guide_id": 1,
        "message": "Hello, I have a question about your service.",
        "timestamp": "2024-12-10T08:00:00Z"
      },
      {
        "message_id": 2,
        "user_id": 1,
        "guide_id": 1,
        "message": "Can you provide more details?",
        "timestamp": "2024-12-10T08:05:00Z"
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Conversation not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Conversations for a User

Returns all conversations for a specific User.

- Require Authentication: true
- Require Authorization: true (User or Manager)
- Request:

  - Method: GET
  - Route path: /api/messages/user/:user_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "conversation_id": 1,
        "user_id": 1,
        "guide_id": 1,
        "messages": [
          {
            "message_id": 1,
            "sender_id": 1,
            "receiver_id": 1,
            "message": "Hello, I have a question about your service.",
            "timestamp": "2024-12-10T08:00:00Z"
          }
        ]
      },
      {
        "conversation_id": 2,
        "user_id": 1,
        "guide_id": 2,
        "messages": [
          {
            "message_id": 2,
            "sender_id": 1,
            "receiver_id": 2,
            "message": "Can you provide more details?",
            "timestamp": "2024-12-10T08:05:00Z"
          }
        ]
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```

#### Get All Conversations for a Guide

Returns all conversations for a specific Guide.

- Require Authentication: true
- Require Authorization: true (Guide or Manager)
- Request:

  - Method: GET
  - Route path: /api/messages/guide/:guide_id
  - Headers:
    - Content-Type: application/json
  - Body: none

- Success Response:

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "conversation_id": 1,
        "user_id": 1,
        "guide_id": 1,
        "messages": [
          {
            "message_id": 1,
            "sender_id": 1,
            "receiver_id": 1,
            "message": "Hello, I have a question about your service.",
            "timestamp": "2024-12-10T08:00:00Z"
          }
        ]
      },
      {
        "conversation_id": 2,
        "user_id": 2,
        "guide_id": 1,
        "messages": [
          {
            "message_id": 2,
            "sender_id": 2,
            "receiver_id": 1,
            "message": "Can you provide more details?",
            "timestamp": "2024-12-10T08:05:00Z"
          }
        ]
      }
    ]
    ```

- Error Responses:

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Guide not found"
    }
    ```

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Internal server error"
    }
    ```
    
### Favorites API Documentation

#### Add a Favorite
- **URL**: `/api/favorites`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <your_auth_token>`
- **Body**:
    ```json
    {
      "service_id": 1
    }
    ```
- **Response**:
  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "id": 1,
      "user_id": 1,
      "service_id": 1
    }
    ```

#### Remove a Favorite
- **URL**: `/api/favorites/<service_id>`
- **Method**: `DELETE`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <your_auth_token>`
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "message": "Favorite successfully removed"
    }
    ```

#### Get All Favorites
- **URL**: `/api/favorites`
- **Method**: `GET`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <your_auth_token>`
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    [
      {
        "id": 1,
        "user_id": 1,
        "service_id": 1
      },
      {
        "id": 2,
        "user_id": 1,
        "service_id": 2
      }
    ]
    ```