require('dotenv/config');

const {
  MYSQL_USER: username,
  MYSQL_PASSWORD: password,
  MYSQL_HOST,
  MYSQL_PORT,
} = process.env;

const host = MYSQL_HOST || '127.0.0.1';
const port = MYSQL_PORT || '3306';

module.exports = {
  development: {
    username,
    password,
    host,
    port,
    database: 'blogs_api',
    dialect: 'mysql',
  },
  test: {
    username,
    password,
    host,
    port,
    database: 'blogs_api_test',
    dialect: 'mysql',
  },
  production: {
    username,
    password,
    host,
    port,
    database: 'blogs_api',
    dialect: 'mysql',
  },
};
