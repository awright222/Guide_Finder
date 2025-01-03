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

### Sign Up a Manager

Creates a new Manager and returns the Manager's information.

- Require Authentication: false
- Request:

  - Method: POST
  - Route path: /api/auth/manager/signup
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "username": "Manager1",
      "password": "managerpassword"
    }
    ```

### User Management

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
      "password": "secret password"
    }
    ```

#### Update a User

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
      "password": "secret password"
    }
    ```

#### Delete a User

- Require Authentication: true
- Request:

  - Method: DELETE
  - Route path: /api/users/:user_id
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Get user Details

Returns the details of a specific User.

Require Authentication: true

Request:

Method: GET
Route path: /api/users/:user_id
Headers:
Content-Type: application/json
Body: none

### Booking Management

#### Create a Booking

Creates and returns a new Booking.

- Require Authentication: true
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

#### Update a Booking

- Require Authentication: true
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

#### Delete a Booking

- Require Authentication: true
- Request:

  - Method: DELETE
  - Route path: /api/bookings/:booking_id
  - Headers:
    - Content-Type: application/json
  - Body: none


#### Get Booking Details

Returns the details of a specific Booking.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/bookings/:booking_id
  - Headers:
    - Content-Type: application/json
  - Body: none


### Gallery Management

#### Add an Image to the Gallery

Creates and returns a new Image for a Service or User.

- Require Authentication: true
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

#### Delete an Image from the Gallery

- Require Authentication: true
- Request:

  - Method: DELETE
  - Route path: /api/gallery/:image_id
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Get Image Details

Returns the details of a specific Image in the Gallery.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/gallery/:image_id
  - Headers:
    - Content-Type: application/json
  - Body: none
### Direct Messaging

#### Send a Message

Creates and returns a new Message in a conversation.

- Require Authentication: true
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

#### Receive Messages

Gets all messages in a conversation.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/messages/:conversation_id
  - Headers:
    - Content-Type: application/json
  - Body: none

### Service Management

#### Search All Services

Gets all services.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/services
  - Headers:
    - Content-Type: application/json
  - Body: none

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


#### Get User Details

Returns the details of a specific User.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/users/:user_id
  - Headers:
    - Content-Type: application/json
  - Body: none



### Service Management

#### Create a Service

Creates and returns a new Service.

- Require Authentication: true (Guide only)
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

#### Update a Service

Updates and returns an existing Service.

- Require Authentication: true (Guide only)
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

#### Delete a Service

Deletes an existing Service.

- Require Authentication: true (Guide only)
- Request:

  - Method: DELETE
  - Route path: /api/services/:service_id
  - Headers:
    - Content-Type: application/json
  - Body: none

### Gallery Management

#### Add an Image to the Gallery

Creates and returns a new Image for a Service.

- Require Authentication: true (Guide only)
- Request:

  - Method: POST
  - Route path: /api/gallery
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "service_id": 1,
      "image": "http://example.com/image.jpg"
    }
    ```

#### Update an Image in the Gallery

Updates and returns an existing Image for a Service.

- Require Authentication: true (Guide only)
- Request:

  - Method: PUT
  - Route path: /api/gallery/:image_id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "service_id": 1,
      "image": "http://example.com/image.jpg"
    }
    ```

#### Delete an Image from the Gallery

Deletes an existing Image for a Service.

- Require Authentication: true (Guide only)
- Request:

  - Method: DELETE
  - Route path: /api/gallery/:image_id
  - Headers:
    - Content-Type: application/json
  - Body: none

### Direct Messaging

#### Send a Message

Creates and returns a new Message in a conversation.

- Require Authentication: true
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

#### Receive Messages

Gets all messages in a conversation.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/messages/:conversation_id
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Get All Conversations for a User

Returns all conversations for a specific User.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/messages/user/:user_id
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Get All Conversations for a Guide

Returns all conversations for a specific Guide.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/messages/guide/:guide_id
  - Headers:
    - Content-Type: application/json
  - Body: none


  ### Manager Management

#### Sign Up a Manager

Creates a new Manager and returns the Manager's information.

- Require Authentication: false
- Request:

  - Method: POST
  - Route path: /api/auth/manager/signup
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "username": "Manager1",
      "password": "managerpassword"
    }
    ```

### Manager CRUD Operations

Managers have full access to create, read, update, and delete Users, Guides, Services, Bookings, and Gallery items. They can also view all Guides, Users, Services, and Bookings.

#### Create a User

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
      "password": "secret password"
    }
    ```

#### Update a User

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
      "password": "secret password"
    }
    ```

#### Delete a User

- Require Authentication: true (Manager only)
- Request:

  - Method: DELETE
  - Route path: /api/users/:user_id
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Get All Users

- Require Authentication: true (Manager only)
- Request:

  - Method: GET
  - Route path: /api/users
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Get User Details

Returns the details of a specific User.

- Require Authentication: true
- Request:

  - Method: GET
  - Route path: /api/users/:user_id
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Create a Guide

- Require Authentication: true (Manager only)
- Request:

  - Method: POST
  - Route path: /api/guides
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

#### Update a Guide

- Require Authentication: true (Manager only)
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

#### Delete a Guide

- Require Authentication: true (Manager only)
- Request:

  - Method: DELETE
  - Route path: /api/guides/:guide_id
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Get All Guides

- Require Authentication: true (Manager only)
- Request:

  - Method: GET
  - Route path: /api/guides
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Create a Service

- Require Authentication: true (Manager only)
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

#### Update a Service

- Require Authentication: true (Manager only)
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

#### Delete a Service

- Require Authentication: true (Manager only)
- Request:

  - Method: DELETE
  - Route path: /api/services/:service_id
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Get All Services

- Require Authentication: true (Manager only)
- Request:

  - Method: GET
  - Route path: /api/services
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Create a Booking

- Require Authentication: true (Manager only)
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

#### Update a Booking

- Require Authentication: true (Manager only)
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

#### Delete a Booking

- Require Authentication: true (Manager only)
- Request:

  - Method: DELETE
  - Route path: /api/bookings/:booking_id
  - Headers:
    - Content-Type: application/json
  - Body: none

#### Get All Bookings

- Require Authentication: true (Manager only)
- Request:

  - Method: GET
  - Route path: /api/bookings
  - Headers:
    - Content-Type: application/json
  - Body: none

### Gallery Management

#### Add an Image to the Gallery

Creates and returns a new Image for a Service or User.

- Require Authentication: true (Manager only)
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

#### Delete an Image from the Gallery

Deletes an existing Image for a Service or User.

- Require Authentication: true (Manager only)
- Request:

  - Method: DELETE
  - Route path: /api/gallery/:image_id
  - Headers:
    - Content-Type: application/json
  - Body: none

  ### Search Functionality

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

Successful Response:
Status Code: 200
Headers:
Content-Type: application/json
Body:


    ```json
  {
    "service_id": 1,
    "guide_id": 1,
    "type": "Hiking",
    "location": "Mountain Trail, CA",
    "description": "A beautiful hike through the mountains.",
    "cost": 100,
    "images": "http://example.com/image.jpg",
    "reviews": "Great experience!"
  },
  {
    "service_id": 2,
    "guide_id": 2,
    "type": "Hiking",
    "location": "Forest Trail, CA",
    "description": "An adventurous hike through the forest.",
    "cost": 150,
    "images": "http://example.com/image2.jpg",
    "reviews": "Amazing hike!"
  }
