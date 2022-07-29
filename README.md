# Blogs API

## Description

This project is an API written in JavaScript with Node.js to manage blog posts.

## Technologies

The complete list of technologies used:

- Node.js
- Express.js
- MySQL
- Sequelize
- JSON Web Token
- bcrypt.js

## Run Project

In order to run this project, you're going to need git, node and npm installed
locally.
First of all, clone the project, and cd into the new directory:
```sh
git clone https://github.com/Lucas-L-S-Haine/28-blogs-api.git blogs-api
cd blogs-api
```
Then install the dependencies:
```sh
npm install
```
After that, create a `.env` file and assign values for the environment variables
present in `.env.template`. It is necessary to provide `MYSQL_USER` and
`MYSQL_PASSWORD` to access the database, and a secret keyword to `JWT_SECRET`.

Once you have completed the previous steps, you can create the database, along
with all the tables using the command:
```sh
npm run create
```
Finally, run the application:
```sh
npm start
```
Now you can make requests to the API through the URL `localhost:3000`.

## Testing Project

If you want to run the automated tests, you can populate the test database with:
```sh
npm run seed
```
Then run the automated tests with:
```sh
npm test
```
To get the test coverage:
```sh
npm run test-coverage
```
