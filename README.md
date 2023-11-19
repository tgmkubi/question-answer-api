
![Logo](https://images.pexels.com/photos/208494/pexels-photo-208494.jpeg)

# Question Answer Rest API

In this project, I developed a Question & Answer REST API using the Node.js, Express.js, and Mongoose. It includes basic functionalities that a simple Q&A website provides.

# Getting started

Make sure you've installed **[Node.js](https://nodejs.org/en)**

To get the Node server running locally:

- Clone this repo
- Install all required dependencies(Optional: check 'devDependencies' inside package.json)
```bash
  npm install
```
- Create [MongoDb Cluster](https://www.mongodb.com/) and Get Connection MongoDb URI
- Set environment variables in config.env under ./config/env
    * Set `MONGO_URI=<YOUR_MONGO_URI>`
    * Set `JWT_SECRET_KEY=<YOUR_SECRET_KEY>`
    * [Gmail SMTP Settings: Easy Step-by-Step Setup Guide (with Screenshots)](https://www.gmass.co/blog/gmail-smtp/). Then:
    * Set `SMTP_USER=<YOUR_GMAIL_EMAIL>`
    * Set `SMTP_PASS=<YOUR_GMAIL_PASSWORD>`

- Load dummy data to database
```bash
  node dummy-generator.js --import
```
- To start the local server
```bash
  npm run dev
``` 
# Overview

### Dependencies

- [bcryptjs](https://www.npmjs.com/package/slugify) - Hashing Password
- [dotenv](https://www.npmjs.com/package/dotenv) - Zero-Dependency module that loads environment variables
- [expressjs](https://www.npmjs.com/package/express) - The server for handling and routing HTTP requests
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Handling exceptions inside of async express routes and passing them into custom express error handlers.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://www.npmjs.com/package/mongoose) - For modeling and mapping MongoDB data to JavaScript
- [multer](https://www.npmjs.com/package/multer) - Node.js middleware for uploading files
- [nodemailer](https://www.npmjs.com/package/nodemailer) - Send e-mails from Node.js
- [slugify](https://www.npmjs.com/package/slugify) - For encoding titles into a URL-friendly format

### devDependencies

- [nodemon](https://www.npmjs.com/package/nodemon) - helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

### Project structure

```
question-answer-api
|   .gitignore
|   dummy-generator.js
|   package-lock.json
|   package.json
|   server.js
|
+---config
|   \---env
|           config.env
|
+---controllers
|       admin.js
|       answer.js
|       auth.js
|       question.js
|       user.js
|
+---dummy
|       answers.json
|       questions.json
|       users.json
|
+---helpers
|   +---authorization
|   |       tokenHelpers.js
|   |
|   +---database
|   |       connectDatabase.js
|   |
|   +---error
|   |       CustomError.js
|   |
|   +---input
|   |       inputHelpers.js
|   |
|   \---libraries
|           sendEmail.js
|
+---middlewares
|   +---authorization
|   |       auth.js
|   |
|   +---database
|   |       databaseErrorHelpers.js
|   |
|   +---errors
|   |       customErrorHandler.js
|   |
|   +---libraries
|   |       profileImageUpload.js
|   |
|   \---query
|           answerQueryMiddleware.js
|           queryMiddlewareHelpers.js
|           questionQueryMiddleware.js
|           userQueryMiddleware.js
|
+---models
|       Answer.js
|       Question.js
|       User.js
|
+---public
|   \---uploads
|           index.html
|
\---routers
        admin.js
        answer.js
        auth.js
        index.js
        questions.js
        user.js
```
### Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also inncludes the routes we'll be using in the application.
- `config/` - This folder contains configuration for central location environment variables and other configurations.
- `routes/` - This folder contains the route definitions (answer, question etc. ) for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models (User, Question).
- `controllers/` - This folder contains controllers for our API.
- `public/` - This folder contains static files for our API.
- `middlewares/` - This folder contains middlewares for our API.
- `helpers/` - This folder contains helper functions for adapting 3rd party libraries for our API.
- `dummy/` - This folder contains dummy data created by dummy-generator.js file for our database.

### Error Handling

In `middlewares/errors/customErrorHandler.js`, we define a error-handling middleware for handling Mongoose's errors and our own errors.

### Authentication

Requests are authenticated using the `Authorization` header and value `Bearer: {{token}}`. with a valid JWT. 

We define express middlewares in `middlewares/authorization/auth.js` that can be used to authenticate requests. The `required` middlewares returns `401` or `403`.

# API USAGE

## AUTH

| METHOD | ROUTE     | FUNCTIONALITY                | POST BODY | ACCESS |
| :-------- | :------- | :------------------------- | :--------------------| :--------|
| `POST` | `/api/auth/register` | *Register New User* | {"name": "Test User","email": "foo@mail.com","password": "123456"} | Public |
| `POST` | `/api/auth/login` | *Login User* | {"email": "foo@mail.com","password": "123456"} | Public |
| `GET` | `/api/auth/profile` | *Get logged in User* | Empty | All users |
| `GET` | `/api/auth/logout` | *Logout User* | Empty | All Users |
| `POST` | `/api/auth/forgotpassword` | *Forget Password Token* | {"email": "foo@mail.com"} | All Users |
| `PUT` | `/api/auth/resetpassword?resetPasswordToken=<resetPasswordToken>` | *Reset Password* | {"password": "12345678"} | All Users |
| `POST` | `/api/auth/upload` | *Upload Image* | Headers Key: 'profile_image' Value: image file | All Users |
| `PUT` | `/api/auth/edit` | *Edit User Details* | {"place": "İzmir"} | All Users |

## ADMIN

| METHOD | ROUTE     | FUNCTIONALITY                | POST BODY | ACCESS |
| :-------- | :------- | :------------------------- | :--------------------| :--------|
| `DEL` | `/api/admin/user/<userId>` | *Delete user* | Empty | Admin Users |
| `GET` | `/block/<userId>/<trueORfalse>` | *Block(<true>) or Unblock(<false>) user* | Empty | Admin Users |

## USERS

| METHOD | ROUTE     | FUNCTIONALITY                | POST BODY | ACCESS |
| :-------- | :------- | :------------------------- | :--------------------| :--------|
| `GET` | `/api/users` | *Get All Users* | Empty | Public|
| `GET` | `/api/users/<userId>` | *Get Single User Details with id* | Empty | Public|

## QUESTIONS

 METHOD | ROUTE     | FUNCTIONALITY                | POST BODY | ACCESS |
| :-------- | :------- | :------------------------- | :--------------------| :--------|
| `POST` | `/api/questions/ask` | *Ask Question* | {"title": "Question Title 1","content": "Question Content 1 Test Content"} | All Users|
| `GET` | `/api/questions/` | *Get All Questions* | Empty | Public|
| `GET` | `/api/questions/<questionId>` | *Get Single Question* | Empty | Public|
| `PUT` | `/api/questions/<questionId>/edit` | *Edit Question* | {"title": "Question Title 1 Edited",} | Question Owner|
| `DEL` | `/api/questions/<questionId>/delete` | *Delete Question* | Empty | Question Owner|
| `GET` | `/api/questions/<questionId>/like` | *Like Question* | Empty | All Users|
| `GET` | `/api/questions/<questionId>/undo_like` | *Undo Like Question* | Empty | All Users|


## ANSWERS

 METHOD | ROUTE     | FUNCTIONALITY                | POST BODY | ACCESS |
| :-------- | :------- | :------------------------- | :--------------------| :--------|
| `POST` | `/api/questions/<questionId>/answers` | *Add New Answer to Question* | {"content": "This is an answer to the question"} | All Users|
| `GET` | `/api/questions/<questionId>/answers` | *Get All Answers of the Question* | Empty | Public|
| `GET` | `/api/questions/<questionId>/answers/<answerId>` | *Get Single Answer of the Question* | Empty | Public|
| `DEL` | `/api/questions/<questionId>/answers/<answerId>/delete` | *Delete Single Answer from the Question* | Empty | Answer Owner|
| `GET` | `/api/questions/<questionId>/answers/<answerId>/like` | *Like Answer* | Empty | All Users|
| `GET` | `/api/questions/<questionId>/answers/<answerId>/undo_like` | *Undo Like Answer* | Empty | All Users|

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
